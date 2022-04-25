import { Device, getDeviceList } from 'usb/dist/usb';

import { Entity } from '../../../dsl/architecture/onion/infrastructure/Repository';
import { Repository } from '../../../dsl/architecture/onion/infrastructure/Repository';

type Dependencies = never;

export type UsbDevicesListEntities = Entity<Device>[];

export type Request = never;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UsbDevicesListRepositoryInterface
  extends Repository<Dependencies, Request, UsbDevicesListEntities> {}

export class UsbDevicesListRepository
  extends Repository<Dependencies, Request, UsbDevicesListEntities>
  implements UsbDevicesListRepositoryInterface
{
  read = () => {
    const devices = getDeviceList() as UsbDevicesListEntities;
    return Promise.resolve(devices);
  };
  update = () =>
    Promise.reject('UsbDevicesListRepository::update has no implementation.');
}
