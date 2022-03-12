import { Entity } from "./Entity";

export interface Repository<T = Entity<unknown>> {
  findAll: () => T[];
}
