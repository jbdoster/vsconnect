import { either as E, function as F, option as O } from "fp-ts";

import { Service } from "../../../dsl/Service";
import { DeviceEntity } from "../../../infrastructure/repositories/use-cases/list-devices/listDevices.entities";

import { ListDevicesRepository } from "../../../infrastructure/repositories/use-cases/list-devices/listDevices.repository";

export type Repositories = {
  listDevicesRepository: ListDevicesRepository;
};

export const listDevicesService: Service.Application<
  Repositories,
  DeviceEntity[]
> = (input) => E.right(input.repositories.listDevicesRepository.findAll());
