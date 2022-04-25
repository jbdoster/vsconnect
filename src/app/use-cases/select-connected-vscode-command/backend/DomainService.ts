import { DomainService } from '../../../../dsl/architecture/onion/core/DomainService';
import {
  SelectConnectedUsbKeyDomainModel,
  SelectConnectedUsbKeyDomainModelInterface,
  ValueObjects,
} from './DomainModel';

export type Context = {
  // information: ,
  // usbDeviceKeyPressed: ,
  // vscodeCommand: ,
};

export interface SelectConnectedUsbKeyDomainServiceInterface
  extends DomainService<
    Context,
    never,
    ValueObjects,
    SelectConnectedUsbKeyDomainModel
  > {
  // update: (context: Context) => Promise<void>;
  update: () => Promise<never>;
}

export class SelectConnectedUsbKeyDomainService
  extends DomainService<
    Context,
    never,
    ValueObjects,
    SelectConnectedUsbKeyDomainModel
  >
  implements SelectConnectedUsbKeyDomainServiceInterface
{
  protected model: SelectConnectedUsbKeyDomainModelInterface;
  constructor(model: SelectConnectedUsbKeyDomainModelInterface) {
    super(model);
    this.model = model;
  }
  update = () =>
    Promise.reject(
      'SelectConnectedUsbKeyDomainService::update has no implementation',
    );

  // TODO
  // validate = async (valueObjects: unknown) => {
  //   await this.model.validate([mapped value object]);
  // }
  validate = () =>
    Promise.reject(
      'SelectConnectedUsbKeyDomainModel::validate has no implementation',
    );
}
