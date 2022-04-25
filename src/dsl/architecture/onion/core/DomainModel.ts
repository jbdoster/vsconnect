import { ValueObject } from './ValueObject';

export abstract class DomainModel<VO = Record<string, ValueObject>> {
  public abstract validate: (data: VO) => Promise<void | never>;
}
