import { DomainModel } from '../../../../dsl/architecture/onion/core/DomainModel';
import { ValueObject } from '../../../../dsl/architecture/onion/core/DomainService';

export type ValueObjects = ValueObject<Record<string, any>>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SelectUsbKeyTriggerDomainModelInterface
  extends DomainModel<ValueObjects> {
  validate: () => Promise<never>;
}
export class SelectUsbKeyTriggerDomainModel
  extends DomainModel<ValueObjects>
  implements SelectUsbKeyTriggerDomainModel
{
  // TODO
  validate = () =>
    Promise.reject(
      'SelectUsbKeyTriggerDomainModelInterface::validate is not yet implemented.',
    );
}
