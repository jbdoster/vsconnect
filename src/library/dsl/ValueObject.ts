import { Invariant } from "./Invariant";

export type ValueObject<T = unknown, I = Readonly<Array<Invariant<T>>>> = {
  readonly value: T;
  readonly invariants: I;
};
