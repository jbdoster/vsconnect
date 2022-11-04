import { Device, getDeviceList } from 'usb/dist/usb';

import { Entity as E } from '../../../dsl/architecture/onion/infrastructure/Repository';
import { Repository } from '../../../dsl/architecture/onion/infrastructure/Repository';

type Dependencies = never;

export type Entity = E<Device>[];

export type Request = Record<string, never>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UsbDevicesListRepositoryInterface
  extends Repository<Dependencies, Request, Entity> {}

export class UsbDevicesListRepository
  extends Repository<Dependencies, Request, Entity>
  implements UsbDevicesListRepositoryInterface
{
  read = () => {
    const devices = getDeviceList() as Entity;
    return Promise.resolve(devices);
  };
}
