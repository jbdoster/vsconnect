import { Device } from 'usb/dist/usb';
import { InEndpoint } from 'usb/dist/usb/endpoint';
import { EventEmitter } from 'events';
import * as vscode from 'vscode';

import { ApplicationService } from '../../../../dsl/architecture/onion/core/ApplicationService';

import { ActivateApplicationDomainService } from './DomainService';

import { UsbDeviceInformationRepositoryInterface } from '../../../infrastructure/repositories/UsbDeviceInformationRepository';
import { VsCodeCommandByUsbDeviceKeyRepositoryInterface } from '../../../infrastructure/repositories/VsCodeCommandByUsbDeviceKeyRepository';
import {
  UsbDevicesListEntities,
  UsbDevicesListRepositoryInterface,
} from '../../../infrastructure/repositories/UsbDevicesListRepository';
import {
  UsbDeviceBrokerEntity,
  UsbDeviceBrokerRepositoryInterface,
} from '../../../infrastructure/repositories/UsbDeviceEndpointBrokerRepository';
import { VsCodeCommandsListEntities } from '../../../infrastructure/repositories/VsCodeCommandsList';

type Event = {
  extensionContext: vscode.ExtensionContext;
};

type Entities = UsbDevicesListEntities;

export type DTO = void;

// keep this
type Repositories = {
  UsbDeviceEndpointBrokerRepository: UsbDeviceBrokerRepositoryInterface;
  UsbDeviceInformationRepository: UsbDeviceInformationRepositoryInterface;
  UsbDevicesListRepository: UsbDevicesListRepositoryInterface;
  VsCodeCommandByUsbDeviceKeyRepository: VsCodeCommandByUsbDeviceKeyRepositoryInterface;
};

export interface ActivateApplicationApplicationServiceInterface
  extends ApplicationService<
    Event,
    Entities,
    Repositories,
    ActivateApplicationDomainService,
    DTO
  > {
  aggregate: (event: Event) => Promise<DTO>;
}

export class ActivateApplicationApplicationService
  extends ApplicationService<
    Event,
    Entities,
    Repositories,
    ActivateApplicationDomainService,
    DTO
  >
  implements ActivateApplicationApplicationServiceInterface
{
  protected domainService: ActivateApplicationDomainService;
  protected repositories: Repositories;
  constructor(dependencies: {
    domainService: ActivateApplicationDomainService;
    repositories: Repositories;
  }) {
    super(dependencies);
    const { repositories, domainService } = dependencies;
    this.domainService = domainService;
    this.repositories = repositories;
  }
  aggregate = async (event: Event) => {
    const usbDevicesList =
      await this.repositories.UsbDevicesListRepository.read(null as never);

    const usbDevices: UsbDeviceBrokerEntity['usbDevices'] = [];

    // TODO
    // move this filter to the domain service
    // this is part of the business
    for (const i in usbDevicesList) {
      const usbDevice = usbDevicesList[i];
      const device = usbDevicesList[i];

      device.open();

      const information =
        await this.repositories.UsbDeviceInformationRepository.read({
          usbDevice,
        });

      if (
        !usbDevice ||
        !information.manufacturer ||
        information.index.toLowerCase().includes('controller')
      )
        continue;

      const endpoint = this.parseInEndpoint(usbDevice);

      if (!endpoint.direction) return;

      const Interface = device.interfaces?.[0];

      if (Interface && Interface.isKernelDriverActive())
        Interface.detachKernelDriver();
      if (Interface) Interface.claim();

      usbDevices.push({
        endpoint,
        information,
      });
    }

    await this.repositories.UsbDeviceEndpointBrokerRepository.update({
      broker: new EventEmitter(),
      usbDevices,
    });

    const usbDeviceBroker =
      await this.repositories.UsbDeviceEndpointBrokerRepository.read(
        undefined as never,
      );

    this.setUsbDeviceKeyPressListener(usbDeviceBroker);

    // TODO
    // await this.domainService.validate({
    //   usbDeviceBroker,
    //   vscodeCommandsList,
    // });
  };

  private parseInEndpoint = (device: Device): InEndpoint => {
    if (!device?.interfaces?.[0]) throw 'No interfaces';

    const usbDeviceInterface = device.interfaces.find(
      (deviceInterface) =>
        !!deviceInterface?.endpoints.find(
          (endpoint) => endpoint.direction === 'in',
        ),
    );

    if (!usbDeviceInterface) throw 'No interface found for device';

    let inDirectionEndpointIndex = -1;

    usbDeviceInterface?.endpoints.forEach((endpoint, i) => {
      if (endpoint.direction === 'in') {
        inDirectionEndpointIndex = i;
      }
    });

    if (inDirectionEndpointIndex === -1)
      throw 'No in direction endpoint found for device';

    // because the reader is recognized as a keyboard when plugged
    if (usbDeviceInterface.isKernelDriverActive())
      usbDeviceInterface.detachKernelDriver();

    usbDeviceInterface.claim();

    const usbDeviceEndpoint = usbDeviceInterface.endpoints[
      inDirectionEndpointIndex
    ] as InEndpoint;

    return usbDeviceEndpoint || ({} as InEndpoint);
  };

  private setUsbDeviceKeyPressListener = (
    usbDeviceBroker: UsbDeviceBrokerEntity,
  ): void => {
    let lock = false;

    usbDeviceBroker.broker.on('data', async (data) => {
      if (lock) {
        console.warn(
          'ActivateApplicationApplicationService -> setUsbDeviceKeyPressListener: locked',
        );
        return;
      }

      lock = true;

      const usbDeviceKey = data.usbDeviceKeyPressed;

      const entity =
        await this.repositories.VsCodeCommandByUsbDeviceKeyRepository.read({
          usbDeviceInformation: data.usbDeviceInformation,
          usbDeviceKey,
        });

      console.log('broker on command existing by key?', usbDeviceKey, entity);

      if (!entity?.vscodeCommand) {
        lock = false;
        return;
      }

      console.log('executing command', entity.vscodeCommand);

      vscode.commands
        .executeCommand(entity.vscodeCommand)
        .then(() => (lock = false))
        .then(() => console.warn('unlocked'));
    });
  };
}
