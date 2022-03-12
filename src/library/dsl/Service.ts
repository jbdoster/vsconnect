import { array as A, either as E, function as F } from "fp-ts";
import { Monad } from "fp-ts/lib/Monad";
import { ReadonlyRecord } from "fp-ts/lib/ReadonlyRecord";
import { map } from "ramda";
import { DeviceEntity } from "../infrastructure/repositories/use-cases/list-devices/listDevices.entities";

import { Entity } from "./Entity";
import { Invariant } from "./Invariant";
import { Repository } from "./Repository";
import { Routine } from "./Routine";
import { Validation } from "./Validation";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Service {
  type OnFirstError = Error;
  // get the things
  export interface Application<
    Repositories = Readonly<Record<string, Repository<Entity<unknown>>>>,
    Entities = ReadonlyArray<Entity<unknown>>
  > {
    (input: {
      repositories: { [P in keyof Repositories]: Repositories[P] };
    }): E.Either<OnFirstError, Entities>;
  }
  // validate the things
  // do the work
  export interface Domain<EntityMap = Record<string, Entity<unknown>>> {
    (input: {
      entities: {
        [P in keyof EntityMap]: EntityMap[P];
      };
    }): E.Either<OnFirstError, typeof input.entities>;
  }
}
