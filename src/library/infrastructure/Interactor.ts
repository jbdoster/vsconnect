// critical service flow

import { either as E, function as F } from "fp-ts";

import { listDevicesService as ApplicationListDevicesService } from "../core/services/application/listDevices.service";
import { listDevicesService as DomainListDevicesService } from "../core/services/domain/use-cases/list-devices/listDevices.service";

import { DeviceEntity } from "./repositories/use-cases/list-devices/listDevices.entities";
import { listDevicesRepository } from "./repositories/use-cases/list-devices/listDevices.repository";

export const listDevicesCoreRoutine = F.pipe(
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
        E.match<
          Error,
          { devices: DeviceEntity[] },
          E.Either<Error, { devices: DeviceEntity[] }>
        >(
          (error: Error) => E.left(error),
          (entities: { devices: DeviceEntity[] }) => {
            return E.right(entities);
          }
        )
      )
  )
);
// const displayDevices = (devices: DeviceEntity[]) =>
// export const displayDevicesUIRoutine = (devices: DeviceEntity[]) => F.pipe();
export const assignDeviceKeyAndVsCodeCommandInteractor = () =>
  F.pipe(listDevicesCoreRoutine);
