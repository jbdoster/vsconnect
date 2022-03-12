import { either as E } from "fp-ts";
import { Entity } from "./Entity";

export interface Routine<
  E = {
    [key: string]: Entity<unknown>;
  }
> {
  (validationsResult: E.Either<Error[], E>): E.Either<Error[], void>;
}
