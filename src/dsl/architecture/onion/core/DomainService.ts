import { DataTransferObject } from './DataTransferObject';
import { DomainModel } from './DomainModel';

export type ValueObject<T = unknown> = T;

export abstract class DomainService<
  Context = unknown,
  DTO = DataTransferObject<unknown>,
  VO = Record<string, ValueObject>,
  DM = DomainModel<VO>,
> {
  protected model: DM;
  constructor(model: DM) {
    this.model = model;
  }
  public abstract validate: (valueObjects: VO) => Promise<unknown>;
  public abstract update: (context: Context) => Promise<DTO>;
}
