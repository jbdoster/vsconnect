import { describe, expect, test } from '@jest/globals';

import {
  UsbDeviceInformationRepositoryInterface,
  UsbDeviceInformationRepository,
  UsbDeviceInformationEntity,
} from './UsbDeviceInformationRepository';
import { Device } from 'usb/dist/usb';

let repository: UsbDeviceInformationRepositoryInterface;

let spies: {
  usbDevice: {
    getStringDescriptor: jest.MockInstance<any, any>;
    deviceDescriptor: {
      iManufacturer: string;
      iSerialNumber: string;
      iProduct: string;
    };
  };
};

beforeEach(() => {
  repository = new UsbDeviceInformationRepository({} as never);

  console.error = jest.fn();

  jest.clearAllMocks();

  spies = {
    usbDevice: {
      getStringDescriptor: jest.fn((index, callback) =>
        callback(undefined, ''),
      ),
      deviceDescriptor: {
        iManufacturer: '',
        iSerialNumber: '',
        iProduct: '',
      },
    },
  };
});

describe('UsbDeviceInformationRepository read()', () => {
  test(`
		Given an application service wishes to retrieve information on a usb device
		Then sufficient usb device information is provided
	`, async () => {
    const expected = {
      index: `test-descriptor-manufacturer-test-product-brand-test-usb-device-serial`,
      manufacturer: 'test-descriptor-manufacturer',
      product: 'test-product-brand',
      serial: 'test-usb-device-serial',
    } as UsbDeviceInformationEntity;

    spies.usbDevice.getStringDescriptor.mockImplementationOnce(
      (index, callback) => callback(undefined, expected.manufacturer),
    );

    spies.usbDevice.getStringDescriptor.mockImplementationOnce(
      (index, callback) => callback(undefined, expected.product),
    );

    spies.usbDevice.getStringDescriptor.mockImplementationOnce(
      (index, callback) => callback(undefined, expected.serial),
    );

    const actual = await repository.read({
      usbDevice: spies.usbDevice as unknown as Device,
    });
    expect(actual).toEqual(expected);
  });

  test(`
    Given an application service wishes to retrieve information on a usb device
    And errors occur when retrieving such information
    Then insufficient usb device information is provided
	`, async () => {
    const expected = {
      index: `--`,
      manufacturer: '',
      product: '',
      serial: '',
    } as UsbDeviceInformationEntity;

    spies.usbDevice.getStringDescriptor.mockImplementationOnce(
      (index, callback) => callback(true, expected.manufacturer),
    );

    spies.usbDevice.getStringDescriptor.mockImplementationOnce(
      (index, callback) => callback(true, expected.product),
    );

    spies.usbDevice.getStringDescriptor.mockImplementationOnce(
      (index, callback) => callback(true, expected.serial),
    );

    const actual = await repository.read({
      usbDevice: spies.usbDevice as unknown as Device,
    });
    expect(actual).toEqual(expected);
  });
});
