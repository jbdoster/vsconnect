import { DomainService } from '../../../../dsl/architecture/onion/core/DomainService';
import {
  SelectVsCodeCommandDomainModel,
  SelectVsCodeCommandDomainModelInterface,
  ValueObjects,
} from './DomainModel';

export type Context = {
  // information: ,
  // usbDeviceKeyPressed: ,
  // vscodeCommand: ,
};

export interface SelectVsCodeCommandDomainServiceInterface
  extends DomainService<
    Context,
    never,
    ValueObjects,
    SelectVsCodeCommandDomainModel
  > {
  // update: (context: Context) => Promise<void>;
  update: () => Promise<never>;
}

export class SelectVsCodeCommandDomainService
  extends DomainService<
    Context,
    never,
    ValueObjects,
    SelectVsCodeCommandDomainModel
  >
  implements SelectVsCodeCommandDomainServiceInterface
{
  protected model: SelectVsCodeCommandDomainModelInterface;
  constructor(model: SelectVsCodeCommandDomainModelInterface) {
    super(model);
    this.model = model;
  }
  update = () =>
    Promise.reject(
      'SelectVsCodeCommandDomainService::update has no implementation',
    );

  // TODO
  // validate = async (valueObjects: unknown) => {
  //   await this.model.validate([mapped value object]);
  // }
  validate = () =>
    Promise.reject(
      'SelectVsCodeCommandDomainModel::validate has no implementation',
    );
}
