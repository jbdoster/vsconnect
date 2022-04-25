import { DomainService } from '../../../../dsl/architecture/onion/core/DomainService';
import {
  RemoveConnectedVsCodeCommandDomainModel,
  RemoveConnectedVsCodeCommandDomainModelInterface,
  ValueObjects,
} from './DomainModel';

export type Context = {
  // information: ,
  // usbDeviceKeyPressed: ,
  // vscodeCommand: ,
};

export interface RemoveConnectedVsCodeCommandDomainServiceInterface
  extends DomainService<
    Context,
    never,
    ValueObjects,
    RemoveConnectedVsCodeCommandDomainModel
  > {
  // update: (context: Context) => Promise<void>;
  update: () => Promise<never>;
}

export class RemoveConnectedVsCodeCommandDomainService
  extends DomainService<
    Context,
    never,
    ValueObjects,
    RemoveConnectedVsCodeCommandDomainModel
  >
  implements RemoveConnectedVsCodeCommandDomainServiceInterface
{
  protected model: RemoveConnectedVsCodeCommandDomainModelInterface;
  constructor(model: RemoveConnectedVsCodeCommandDomainModelInterface) {
    super(model);
    this.model = model;
  }
  update = () =>
    Promise.reject(
      'RemoveConnectedVsCodeCommandDomainService::update has no implementation',
    );

  // TODO
  // validate = async (valueObjects: unknown) => {
  //   await this.model.validate([mapped value object]);
  // }
  validate = () =>
    Promise.reject(
      'RemoveConnectedVsCodeCommandDomainModel::validate has no implementation',
    );
}
