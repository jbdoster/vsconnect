import { once } from 'events';

import { UsbDeviceKeyPressEventData } from '../../../infrastructure/repositories/UsbDeviceEndpointBrokerRepository';

import { ApplicationService } from '../../../../dsl/architecture/onion/core/ApplicationService';

import { SelectUsbKeyTriggerDomainService } from './DomainService';

import { UsbDeviceInformationRepositoryInterface } from '../../../infrastructure/repositories/UsbDeviceInformationRepository';
import { VsCodeCommandByUsbDeviceKeyRepositoryInterface } from '../../../infrastructure/repositories/VsCodeCommandByUsbDeviceKeyRepository';
import {
  UsbDevicesListEntities,
  UsbDevicesListRepositoryInterface,
} from '../../../infrastructure/repositories/UsbDevicesListRepository';
import { UsbDeviceBrokerRepositoryInterface } from '../../../infrastructure/repositories/UsbDeviceEndpointBrokerRepository';
import {
  VsCodeCommandsListEntities,
  VsCodeCommandsListRepositoryInterface,
} from '../../../infrastructure/repositories/VsCodeCommandsList';

type Event = never;

type Entities = UsbDevicesListEntities;

export type DTO = {
  usbDeviceKeyPressDataEventList: UsbDeviceKeyPressEventData[];
  vsCodeCommandsListEntities: VsCodeCommandsListEntities;
};

// keep this
type Repositories = {
  UsbDeviceEndpointBrokerRepository: UsbDeviceBrokerRepositoryInterface;
  UsbDeviceInformationRepository: UsbDeviceInformationRepositoryInterface;
  UsbDevicesListRepository: UsbDevicesListRepositoryInterface;
  VsCodeCommandByUsbDeviceKeyRepository: VsCodeCommandByUsbDeviceKeyRepositoryInterface;
  VsCodeCommandsListRepository: VsCodeCommandsListRepositoryInterface;
};

export interface SelectUsbKeyTriggerApplicationServiceInterface
  extends ApplicationService<
    Event,
    Entities,
    Repositories,
    SelectUsbKeyTriggerDomainService,
    DTO
  > {
  aggregate: (event: Event) => Promise<DTO>;
}

export class SelectUsbKeyTriggerApplicationService
  extends ApplicationService<
    Event,
    Entities,
    Repositories,
    SelectUsbKeyTriggerDomainService,
    DTO
  >
  implements SelectUsbKeyTriggerApplicationServiceInterface
{
  protected domainService: SelectUsbKeyTriggerDomainService;
  protected repositories: Repositories;
  constructor(dependencies: {
    domainService: SelectUsbKeyTriggerDomainService;
    repositories: Repositories;
  }) {
    super(dependencies);
    const { repositories, domainService } = dependencies;
    this.domainService = domainService;
    this.repositories = repositories;
  }
  aggregate = async () => {
    const usbDeviceBroker =
      await this.repositories.UsbDeviceEndpointBrokerRepository.read(
        undefined as never,
      );

    const dto = await this.domainService.update({
      usbDeviceBroker,
    });
    console.log('the key data', dto.usbDeviceKeyPressDataEventList.length);

    const vsCodeCommandsListEntities =
      await this.repositories.VsCodeCommandsListRepository.read(
        undefined as never,
      );

    await Promise.all([
      dto.usbDeviceKeyPressDataEventList.map((usbDeviceKeyPressEventData) =>
        this.repositories.VsCodeCommandByUsbDeviceKeyRepository.update({
          information: usbDeviceKeyPressEventData.usbDeviceInformation,
          usbDeviceKeyPressed: usbDeviceKeyPressEventData.usbDeviceKeyPressed,
          vscodeCommand: '',
        }),
      ),
    ]);

    return {
      usbDeviceKeyPressDataEventList: dto.usbDeviceKeyPressDataEventList,
      vsCodeCommandsListEntities,
    } as DTO;
  };
}
