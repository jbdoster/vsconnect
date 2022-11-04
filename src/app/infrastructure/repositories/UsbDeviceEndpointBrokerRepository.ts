import { EventEmitter } from 'events';
import { InEndpoint } from 'usb/dist/usb/endpoint';

import {
  Entity as E,
  Repository,
} from '../../../dsl/architecture/onion/infrastructure/Repository';
import { UsbDeviceInformationEntity } from './UsbDeviceInformationRepository';

export type UsbDeviceKeyPressEventData = {
  usbDeviceKeyPressed: Buffer;
  usbDeviceInformation: UsbDeviceInformationEntity;
};

export type Entity = E<
  {
    broker: UsbDeviceBroker;
  } & {
    usbDevices: {
      endpoint: InEndpoint;
      information: UsbDeviceInformationEntity;
    }[];
  }
>;

export interface UsbDeviceBroker extends EventEmitter {
  emit(event: 'data', data: UsbDeviceKeyPressEventData): boolean;
  on(event: 'data', listener: (data: UsbDeviceKeyPressEventData) => void): this;
}

type Dependencies = Record<string, never>;
type Request = Record<string, never>;

export interface Interface extends Repository<Dependencies, Request, Entity> {
  update(entity: Entity): Promise<void>;
}

export class UsbDeviceEndpointBrokerRepository
  extends Repository<Dependencies, Request, Entity>
  implements Interface
{
  private entity: Entity;
  constructor() {
    super({});
    this.entity = {
      broker: new EventEmitter(),
      usbDevices: [],
    } as Entity;
  }
  read = (request: Request) => {
    return Promise.resolve(this.entity as Entity);
  };
  update = (entity: Entity) => {
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
