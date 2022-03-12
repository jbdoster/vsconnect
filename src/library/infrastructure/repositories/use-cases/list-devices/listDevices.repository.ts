import { getDeviceList } from "usb";

import { Repository } from "../../../../dsl/Repository";

import { DeviceEntity } from "./listDevices.entities";

export interface ListDevicesRepository extends Repository<DeviceEntity> {
  findAll: () => DeviceEntity[];
}
export const listDevicesRepository: ListDevicesRepository = {
  findAll: () => getDeviceList(),
};
