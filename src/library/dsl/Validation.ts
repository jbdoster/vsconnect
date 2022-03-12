import { either as E } from "fp-ts";

export interface Validation<T = unknown> {
  (invalid: T): E.Either<Error, T>;
}
