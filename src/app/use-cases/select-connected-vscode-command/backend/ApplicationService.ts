import { ApplicationService } from '../../../../dsl/architecture/onion/core/ApplicationService';

import {
  VsCodeCommandByUsbDeviceKeyEntity,
  VsCodeCommandByUsbDeviceKeyRepositoryInterface,
} from '../../../infrastructure/repositories/VsCodeCommandByUsbDeviceKeyRepository';
import { UsbDevicesListEntities } from '../../../infrastructure/repositories/UsbDevicesListRepository';
import { SelectConnectedUsbKeyDomainService } from './DomainService';

type Event = never;

type Entities = UsbDevicesListEntities;

export type DTO = {
  connectedUsbKeys: VsCodeCommandByUsbDeviceKeyEntity[];
};

// keep this
type Repositories = {
  VsCodeCommandByUsbDeviceKeyRepository: VsCodeCommandByUsbDeviceKeyRepositoryInterface;
};

export interface SelectConnectedUsbKeyApplicationServiceInterface
  extends ApplicationService<
    Event,
    Entities,
    Repositories,
    SelectConnectedUsbKeyDomainService,
    DTO
  > {
  aggregate: (event: Event) => Promise<DTO>;
}

export class SelectConnectedUsbKeyApplicationService
  extends ApplicationService<
    Event,
    Entities,
    Repositories,
    SelectConnectedUsbKeyDomainService,
    DTO
  >
  implements SelectConnectedUsbKeyApplicationServiceInterface
{
  protected domainService: SelectConnectedUsbKeyDomainService;
  protected repositories: Repositories;
  constructor(dependencies: {
    domainService: SelectConnectedUsbKeyDomainService;
    repositories: Repositories;
  }) {
    super(dependencies);
    const { repositories, domainService } = dependencies;
    this.repositories = repositories;
    this.domainService = domainService;
  }
  aggregate = async (event: Event) => {
    const connectedUsbKeys =
      await this.repositories.VsCodeCommandByUsbDeviceKeyRepository.readAll();
    return {
      connectedUsbKeys,
    };
  };
}
