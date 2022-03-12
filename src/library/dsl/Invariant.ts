import { either as E } from "fp-ts"

export interface Invariant<T = unknown> {
    (invalid: T): E.Either<Error, T>
}