export type Entity<T = unknown> = T;

export abstract class Repository<
  D = Record<string, unknown> | Record<string, never>,
  R = unknown,
  E = Entity<unknown> | Entity<unknown>[],
> {
  protected dependencies: D;
  constructor(dependencies: D) {
    this.dependencies = dependencies;
  }
  public abstract read: (request: R) => Promise<E>;
  public update?: (entity: E) => Promise<void>;
  public readAll?: (request: R) => Promise<E[]>;
  public removeAll?: (request: Record<string, never>) => Promise<void>;
  public remove?: (request: R) => Promise<void>;
}
