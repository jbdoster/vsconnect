import { describe, expect, test } from '@jest/globals';
import { EventEmitter } from 'stream';

import {
  UsbDeviceBroker,
  Interface as UsbDeviceBrokerRepositoryInterface,
  UsbDeviceEndpointBrokerRepository,
} from './UsbDeviceEndpointBrokerRepository';

let repository: UsbDeviceBrokerRepositoryInterface;

const spies = {
  usbDevice: {
    endpoint: {
      emit: {},
      on: {},
      startPoll: {},
    },
  },
} as any;

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();

  console.error = jest.fn();
  console.log = jest.fn();

  repository = new UsbDeviceEndpointBrokerRepository();

  spies.usbDevice.endpoint.startPoll = jest.fn(
    (n, l, callback) => callback && callback(undefined, Buffer.from(''), 0),
  );
  spies.usbDevice.endpoint.emit = jest.fn((event) => void 0);
  spies.usbDevice.endpoint.on = jest.fn(
    (event, callback) => callback && callback(),
  );
});

describe('UsbDeviceEndpointBrokerRepository read', () => {
  test(`
		Given the application has been activated
		Then an existing usb device endpoint broker instance is provided
	`, async () => {
    const expectedBroker = {
      broker: new EventEmitter(),
      usbDevices: [spies.usbDevice],
    };
    await repository.update(expectedBroker);
    const actualBroker = await repository.read({});
    expect(actualBroker).toBe(expectedBroker);
  });

  test(`
		Given the application has not been activated
		Then no usb device endpoint broker instance is provided
	`, async () => {
    const expected = {
      broker: new EventEmitter() as UsbDeviceBroker,
      usbDevices: [],
    };
    const actual = await repository.read({});
    expect(actual).toEqual(expected);
  });
});

describe('UsbDeviceEndpointBrokerRepository update', () => {
  test(`
		Given the application has been activated
		And a list of usb device endpoint references have been gathered
    Then each usb device endpoint starts polling
	`, async () => {
    const broker = {
      broker: new EventEmitter(),
      usbDevices: [spies.usbDevice],
    };
    const expectedStartPollInput = [1, 4];
    await repository.update(broker);
    const actual = await repository.read({});
    expect(actual.usbDevices[0].endpoint.startPoll).toBeCalledTimes(1);
    expect(actual.usbDevices[0].endpoint.startPoll).toBeCalledWith(
      ...expectedStartPollInput,
    );
  });
});
