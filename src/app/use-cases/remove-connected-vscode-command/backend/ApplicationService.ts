import { ApplicationService } from '../../../../dsl/architecture/onion/core/ApplicationService';

import { VsCodeCommandByUsbDeviceKeyRepositoryInterface } from '../../../infrastructure/repositories/VsCodeCommandByUsbDeviceKeyRepository';
import { UsbDevicesListEntities } from '../../../infrastructure/repositories/UsbDevicesListRepository';
import { RemoveConnectedVsCodeCommandDomainService } from './DomainService';

type Event = {
  selectedVsCodeCommand: string;
};

type Entities = UsbDevicesListEntities;

export type DTO = void;

// keep this
type Repositories = {
  VsCodeCommandByUsbDeviceKeyRepository: VsCodeCommandByUsbDeviceKeyRepositoryInterface;
};

export interface RemoveConnectedVsCodeCommandApplicationServiceInterface
  extends ApplicationService<
    Event,
    Entities,
    Repositories,
    RemoveConnectedVsCodeCommandDomainService,
    DTO
  > {
  aggregate: (event: Event) => Promise<DTO>;
}

export class RemoveConnectedVsCodeCommandApplicationService
  extends ApplicationService<
    Event,
    Entities,
    Repositories,
    RemoveConnectedVsCodeCommandDomainService,
    DTO
  >
  implements RemoveConnectedVsCodeCommandApplicationServiceInterface
{
  protected domainService: RemoveConnectedVsCodeCommandDomainService;
  protected repositories: Repositories;
  constructor(dependencies: {
    domainService: RemoveConnectedVsCodeCommandDomainService;
    repositories: Repositories;
  }) {
    super(dependencies);
    const { repositories, domainService } = dependencies;
    this.repositories = repositories;
    this.domainService = domainService;
  }
  aggregate = async (event: Event) => {
    return this.repositories.VsCodeCommandByUsbDeviceKeyRepository.remove({
      selectedVsCodeCommand: event.selectedVsCodeCommand,
    });
  };
}
