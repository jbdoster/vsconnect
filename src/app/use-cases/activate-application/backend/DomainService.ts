import { DomainService } from '../../../../dsl/architecture/onion/core/DomainService';
import { ValueObject } from '../../../../dsl/architecture/onion/core/ValueObject';
import { UsbDeviceBrokerEntity } from '../../../infrastructure/repositories/UsbDeviceEndpointBrokerRepository';
import { VsCodeCommandsListEntities } from '../../../infrastructure/repositories/VsCodeCommandsList';
export type Context = {
  usbDeviceBroker: UsbDeviceBrokerEntity;
  vscodeCommandsList: VsCodeCommandsListEntities;
};

import {
  ActivateApplicationDomainModel,
  ActivateApplicationDomainModelInterface,
} from './DomainModel';

export type ValueObjects = ValueObject<never>;

export interface ActivateApplicationDomainServiceInterface
  extends DomainService<
    Context,
    void,
    ValueObjects,
    ActivateApplicationDomainModel
  > {
  update: (data: Context) => Promise<void>;
}

export class ActivateApplicationDomainService
  extends DomainService<
    Context,
    void,
    ValueObjects,
    ActivateApplicationDomainModel
  >
  implements ActivateApplicationDomainServiceInterface
{
  protected model: ActivateApplicationDomainModelInterface;
  constructor(model: ActivateApplicationDomainModelInterface) {
    super(model);
    this.model = model;
  }
  update = (context: Context) =>
    Promise.reject(
      'ActivateApplicationDomainService::update has no implementation',
    );
  validate = () =>
    Promise.reject(
      'ActivateApplicationDomainModel::validate is not yet implemented',
    );

  // TODO
  // validate = async (valueObjects: unknown) => {
  //   await this.model.validate([mapped value object]);
  // }
}
