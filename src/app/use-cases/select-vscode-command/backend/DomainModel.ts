import { DomainModel } from '../../../../dsl/architecture/onion/core/DomainModel';
import { ValueObject } from '../../../../dsl/architecture/onion/core/DomainService';

export type ValueObjects = ValueObject<Record<string, any>>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SelectVsCodeCommandDomainModelInterface
  extends DomainModel<ValueObjects> {
  validate: () => Promise<never>;
}
export class SelectVsCodeCommandDomainModel
  extends DomainModel<ValueObjects>
  implements SelectVsCodeCommandDomainModel
{
  // TODO
  validate = () =>
    Promise.reject(
      'SelectVsCodeCommandDomainModel::validate has no implementation',
    );
}
