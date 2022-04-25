import { DomainModel } from '../../../../dsl/architecture/onion/core/DomainModel';
import { ValueObject } from '../../../../dsl/architecture/onion/core/DomainService';

export type ValueObjects = ValueObject<Record<string, any>>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SelectConnectedUsbKeyDomainModelInterface
  extends DomainModel<ValueObjects> {
  validate: () => Promise<never>;
}
export class SelectConnectedUsbKeyDomainModel
  extends DomainModel<ValueObjects>
  implements SelectConnectedUsbKeyDomainModel
{
  // TODO
  validate = () =>
    Promise.reject(
      'SelectConnectedUsbKeyDomainModel::validate has no implementation',
    );
}
