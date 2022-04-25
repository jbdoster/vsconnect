import { DomainModel } from '../../../../dsl/architecture/onion/core/DomainModel';
import { ValueObject } from '../../../../dsl/architecture/onion/core/DomainService';

export type ValueObjects = ValueObject<never>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ActivateApplicationDomainModelInterface
  extends DomainModel<ValueObjects> {
  validate: () => Promise<never>;
}
export class ActivateApplicationDomainModel
  extends DomainModel<ValueObjects>
  implements ActivateApplicationDomainModel
{
  public validate = () =>
    Promise.reject(
      'ActivateApplicationDomainModel::validate is not yet implemented',
    );
  // TODO
  // validate: (data: ValueObjects) => Promise<void>;
}
