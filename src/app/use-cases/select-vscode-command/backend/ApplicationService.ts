import { ApplicationService } from '../../../../dsl/architecture/onion/core/ApplicationService';

import { UsbDeviceInformationRepositoryInterface } from '../../../infrastructure/repositories/UsbDeviceInformationRepository';
import { VsCodeCommandByUsbDeviceKeyRepositoryInterface } from '../../../infrastructure/repositories/VsCodeCommandByUsbDeviceKeyRepository';
import {
  UsbDevicesListEntities,
  UsbDevicesListRepositoryInterface,
} from '../../../infrastructure/repositories/UsbDevicesListRepository';
import {
  UsbDeviceBrokerRepositoryInterface,
  UsbDeviceKeyPressEventData,
} from '../../../infrastructure/repositories/UsbDeviceEndpointBrokerRepository';
import {
  VsCodeCommandsListEntities,
  VsCodeCommandsListRepositoryInterface,
} from '../../../infrastructure/repositories/VsCodeCommandsList';
import { SelectVsCodeCommandDomainService } from './DomainService';

type Event = {
  // selectUsbKeyDTO: Record<string, any>;
  selectUsbKeyDTO: {
    usbDeviceKeyPressDataEventList: UsbDeviceKeyPressEventData[];
    vsCodeCommandsListEntities: VsCodeCommandsListEntities;
  };
  vscodeCommand: string;
};

type Entities = UsbDevicesListEntities;

export type DTO = {
  vscodeCommand: string;
};

// keep this
type Repositories = {
  UsbDeviceEndpointBrokerRepository: UsbDeviceBrokerRepositoryInterface;
  UsbDeviceInformationRepository: UsbDeviceInformationRepositoryInterface;
  UsbDevicesListRepository: UsbDevicesListRepositoryInterface;
  VsCodeCommandByUsbDeviceKeyRepository: VsCodeCommandByUsbDeviceKeyRepositoryInterface;
  VsCodeCommandsListRepository: VsCodeCommandsListRepositoryInterface;
};

export interface SelectVsCodeCommandApplicationServiceInterface
  extends ApplicationService<
    Event,
    Entities,
    Repositories,
    SelectVsCodeCommandDomainService,
    DTO
  > {
  aggregate: (event: Event) => Promise<DTO>;
}

export class SelectVsCodeCommandApplicationService
  extends ApplicationService<
    Event,
    Entities,
    Repositories,
    SelectVsCodeCommandDomainService,
    DTO
  >
  implements SelectVsCodeCommandApplicationServiceInterface
{
  protected domainService: SelectVsCodeCommandDomainService;
  protected repositories: Repositories;
  constructor(dependencies: {
    domainService: SelectVsCodeCommandDomainService;
    repositories: Repositories;
  }) {
    super(dependencies);
    const { repositories, domainService } = dependencies;
    this.repositories = repositories;
    this.domainService = domainService;
  }
  aggregate = async (event: Event) => {
    await Promise.all([
      event.selectUsbKeyDTO.usbDeviceKeyPressDataEventList.map(
        (usbDeviceKeyPressEventData) =>
          this.repositories.VsCodeCommandByUsbDeviceKeyRepository.update({
            information: usbDeviceKeyPressEventData.usbDeviceInformation,
            usbDeviceKeyPressed: usbDeviceKeyPressEventData.usbDeviceKeyPressed,
            vscodeCommand: event.vscodeCommand,
          }),
      ),
    ]);

    return {
      vscodeCommand: event.vscodeCommand,
    };
  };
}
