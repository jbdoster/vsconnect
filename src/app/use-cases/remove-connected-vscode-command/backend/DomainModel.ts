import { DomainModel } from '../../../../dsl/architecture/onion/core/DomainModel';
import { ValueObject } from '../../../../dsl/architecture/onion/core/DomainService';

export type ValueObjects = ValueObject<Record<string, any>>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RemoveConnectedVsCodeCommandDomainModelInterface
  extends DomainModel<ValueObjects> {
  validate: () => Promise<never>;
}
export class RemoveConnectedVsCodeCommandDomainModel
  extends DomainModel<ValueObjects>
  implements RemoveConnectedVsCodeCommandDomainModel
{
  // TODO
  validate = () =>
    Promise.reject(
      'RemoveConnectedVsCodeCommandDomainModel::validate has no implementation',
    );
}
