// critical service flow

import { either as E, function as F } from "fp-ts";

import { listDevicesService as ApplicationListDevicesService } from "../core/services/application/listDevices.service";
import { listDevicesService as DomainListDevicesService } from "../core/services/domain/use-cases/list-devices/listDevices.service";

import { DeviceEntity } from "./repositories/use-cases/list-devices/listDevices.entities";
import { listDevicesRepository } from "./repositories/use-cases/list-devices/listDevices.repository";

/**
 * 1. UI routine
 *  a. Map Output
 * 2. Application Sequence
 *  a. Map output
 * 3. Domain Sequence
 *  a. Map Output
 * 4.
 */
export const listDevicesRoutine = F.pipe(
  ApplicationListDevicesService({
    repositories: {
      listDevicesRepository,
    },
  }),
  E.match<Error, DeviceEntity[], E.Either<Error, { devices: DeviceEntity[] }>>(
    (error: Error) => E.left(error),
    (devices: DeviceEntity[]) =>
      F.pipe(
        DomainListDevicesService({
          entities: {
            devices,
          },
        }),
        // TODO update return type according to UI flow return type
        E.match<
          Error,
          { devices: DeviceEntity[] },
          E.Either<Error, { devices: DeviceEntity[] }>
        >(
          (error: Error) => E.left(error),
          // TODO update this to UI flow
          // next step is to get device selection from user
          // ask them to choose a key to use to trigger the VS Code commands
          (entities: { devices: DeviceEntity[] }) => {
            console.log("entities", entities);
            return E.right(entities);
          }
        )
      )
  )
);
export const assignDeviceKeyAndVsCodeCommandInteractor = () =>
  F.pipe(listDevicesRoutine);
