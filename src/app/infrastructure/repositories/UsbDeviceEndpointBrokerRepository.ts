import { EventEmitter } from 'events';
import { InEndpoint } from 'usb/dist/usb/endpoint';

import {
  Entity,
  Repository,
} from '../../../dsl/architecture/onion/infrastructure/Repository';
import { UsbDeviceInformationEntity } from './UsbDeviceInformationRepository';

type Dependencies = never;

export type UsbDeviceKeyPressEventData = {
  usbDeviceKeyPressed: Buffer;
  usbDeviceInformation: UsbDeviceInformationEntity;
};

export interface UsbDeviceBroker extends EventEmitter {
  emit(event: 'data', data: UsbDeviceKeyPressEventData): boolean;
  on(event: 'data', listener: (data: UsbDeviceKeyPressEventData) => void): this;
}

export type UsbDeviceBrokerEntity = Entity<
  {
    broker: UsbDeviceBroker;
  } & {
    usbDevices: {
      endpoint: InEndpoint;
      information: UsbDeviceInformationEntity;
    }[];
  }
>;

type Request = never;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UsbDeviceBrokerRepositoryInterface
  extends Repository<Dependencies, Request, UsbDeviceBrokerEntity> {}

export class UsbDeviceEndpointBrokerRepository
  extends Repository<Dependencies, Request, UsbDeviceBrokerEntity>
  implements UsbDeviceBrokerRepositoryInterface
{
  private entity: UsbDeviceBrokerEntity;
  constructor() {
    super(null as never);
    this.entity = {
      broker: new EventEmitter(),
      usbDevices: [],
    } as UsbDeviceBrokerEntity;
  }
  read = (request: Request) => {
    return Promise.resolve(this.entity as UsbDeviceBrokerEntity);
  };
  update = (entity: UsbDeviceBrokerEntity) => {
    entity.usbDevices.forEach((usbDevice) => {
      usbDevice.endpoint.startPoll(1, 4);
      usbDevice.endpoint.on('data', (usbDeviceKeyPressed: Buffer) => {
        console.log('once data', usbDeviceKeyPressed);
        entity.broker.emit('data', {
          usbDeviceKeyPressed,
          usbDeviceInformation: usbDevice.information,
        });
      });
    });
    this.entity = entity;
    return Promise.resolve();
  };
}
