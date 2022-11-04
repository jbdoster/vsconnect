import { describe, expect, test } from '@jest/globals';

import {
  UsbDevicesListRepositoryInterface,
  UsbDevicesListRepository,
  Entity,
} from './UsbDevicesListRepository';
import * as usb from 'usb/dist/usb';

jest.mock('usb/dist/usb');

let repository: UsbDevicesListRepositoryInterface;

let context: any;

let spies: {
  getDeviceList: any;
};

beforeEach(() => {
  repository = new UsbDevicesListRepository({} as never);

  console.error = jest.fn();

  jest.clearAllMocks();

  context = {
    promiseRejection: 'UsbDevicesListRepository::update has no implementation.',
    usbDevices: [
      {
        id: '',
      },
    ],
  };

  spies = {
    getDeviceList: jest
      .spyOn(usb, 'getDeviceList')
      .mockImplementation(() => context.usbDevices),
  };
});

describe('UsbDevicesListRepository read()', () => {
  test(`
		Given an application service wishes to retrieve a list of available usb devices
		Then a list of their references is provided
	`, async () => {
    const expected = context.usbDevices;

    const actual = await repository.read({});

    expect(actual).toEqual(expected);

    expect(spies.getDeviceList).toBeCalledTimes(1);
  });
});
