import { either as E, function as F } from "fp-ts";

import { Service } from "../../../../../dsl/Service";
// import { DeviceEntity } from "./listDevices.entities";

type Service = Service.Domain<{
  devices: any;
  // devices: DeviceEntity[];
}>;

export const listDevicesService: Service = (input) =>
  // TODO eventually validate entities
  E.right(input.entities);
