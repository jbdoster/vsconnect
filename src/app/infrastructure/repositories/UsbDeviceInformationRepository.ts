import { Device } from 'usb/dist/usb';
import { Entity } from '../../../dsl/architecture/onion/infrastructure/Repository';
import { Repository } from '../../../dsl/architecture/onion/infrastructure/Repository';

type Dependencies = never;

export type UsbDeviceInformationEntity = Entity<{
  readonly index: string;
  readonly manufacturer: string;
  readonly product: string;
  readonly serial: string;
}>;

type Request = {
  usbDevice: Device;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UsbDeviceInformationRepositoryInterface
  extends Repository<Dependencies, Request, UsbDeviceInformationEntity> {}

export class UsbDeviceInformationRepository
  extends Repository<Dependencies, Request, UsbDeviceInformationEntity>
  implements UsbDeviceInformationRepositoryInterface
{
  read = async (request: Request) => {
    const manufacturer = await this.getDevicePropertyByDescriptor(
      request.usbDevice,
      'iManufacturer',
    );
    const product = await this.getDevicePropertyByDescriptor(
      request.usbDevice,
      'iProduct',
    );
    const serial = await this.getDevicePropertyByDescriptor(
      request.usbDevice,
      'iSerialNumber',
    );
    const index = `${manufacturer}-${product}-${serial}`;
    const entity = {
      index,
      manufacturer,
      product,
      serial,
    } as UsbDeviceInformationEntity;
    return entity;
  };
  update = () =>
    Promise.reject(
      'UsbDeviceInformationRepository::update has no implementation.',
    );
  private getDevicePropertyByDescriptor = (
    device: Device,
    descriptor: keyof Device['deviceDescriptor'],
  ): Promise<number | string> =>
    new Promise((resolve, reject) => {
      device.getStringDescriptor(
        device.deviceDescriptor[descriptor],
        (error, data) => {
          if (error) {
            console.error(`getStringDescriptor ${error}`);
            return resolve('');
          }
          if (!data) {
            console.warn('UsbDevicesListRepository no data');
            return resolve('');
          }
          resolve(data.toString());
        },
      );
    });
}
