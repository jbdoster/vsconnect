import { describe, expect, test } from '@jest/globals';
import { Entity, Request } from './VsCodeCommandByUsbDeviceKeyRepository';

import {
  VsCodeCommandByUsbDeviceKeyRepositoryInterface,
  VsCodeCommandByUsbDeviceKeyRepository,
} from './VsCodeCommandByUsbDeviceKeyRepository';

jest.mock('usb/dist/usb');

let repository: VsCodeCommandByUsbDeviceKeyRepositoryInterface;

let context: {
  entity1: Entity;
  entity2: Entity;
  request: Request;
};

let spies: any;

const generateUsbDeviceKeyPressed = (context: any) => {
  let usbDeviceKeyPressed: number[] = [];
  for (const value of context.entity1.usbDeviceKeyPressed.entries()) {
    usbDeviceKeyPressed = usbDeviceKeyPressed.concat(value);
  }
  return `${
    context.entity1.information.index
  }::${usbDeviceKeyPressed.toString()}`;
  // return usbDeviceKeyPressed;
};

beforeEach(() => {
  console.error = jest.fn();

  jest.clearAllMocks();

  const buffer = Buffer.from(new ArrayBuffer(4));

  const usbDeviceInformation = {
    manufacturer: 'test-descriptor-manufacturer',
    product: 'test-product-brand',
    serial: 'test-usb-device-serial',
  };

  context = {
    entity1: {
      usbDeviceKeyPressed: buffer,
      vscodeCommand: 'test-vscode-command',
      information: {
        ...usbDeviceInformation,
        index: 'test-entity-index-1',
      },
    },
    entity2: {
      usbDeviceKeyPressed: buffer,
      vscodeCommand: 'test-vscode-command',
      information: {
        ...usbDeviceInformation,
        index: 'test-entity-index-2',
      },
    },
    request: {
      usbDeviceInformation: {
        ...usbDeviceInformation,
        index: 'test-entity-index-1',
      },
      usbDeviceKey: buffer,
    },
  };

  spies = {
    extensionContext: {
      globalState: {
        get: jest.fn().mockReturnValue(context.entity1),
        keys: jest
          .fn()
          .mockReturnValue([
            context.entity1.information.index,
            context.entity2.information.index,
          ]),
        update: jest.fn().mockImplementation(() => void 0),
      },
    },
  };

  repository = new VsCodeCommandByUsbDeviceKeyRepository({
    context: spies.extensionContext,
  });
});

describe('VsCodeCommandByUsbDeviceKeyRepository read()', () => {
  test(`
		Given a user has selected the usb device key
    And they have selected the vscode command to pair it with
    Then the repository can read it when the user attempts to trigger a command
	`, async () => {
    const expected = generateUsbDeviceKeyPressed(context);
    await repository.read(context.request);
    expect(spies.extensionContext.globalState.get).toBeCalledTimes(1);
    expect(spies.extensionContext.globalState.get).toBeCalledWith(expected);
  });
});

describe('VsCodeCommandByUsbDeviceKeyRepository readAll()', () => {
  test(`
		Given a user has selected multiple usb device keys
    And they have selected multiple the vscode command to pair it with
    Then the repository can read all records it 
    When the user attempts to remove a device or devices
	`, async () => {
    spies.extensionContext.globalState.get.mockReturnValueOnce(context.entity1);
    spies.extensionContext.globalState.get.mockReturnValueOnce(context.entity2);
    const expectedFirstCallInput = context.entity1.information.index;
    const expectedSecondCallInput = context.entity2.information.index;
    await repository.readAll();
    const actualFirstCall =
      spies.extensionContext.globalState.get.mock.calls[0][0];
    const actualSecondCall =
      spies.extensionContext.globalState.get.mock.calls[1][0];
    expect(spies.extensionContext.globalState.get).toBeCalledTimes(2);
    expect(actualFirstCall).toEqual(expectedFirstCallInput);
    expect(actualSecondCall).toEqual(expectedSecondCallInput);
  });
});

describe('VsCodeCommandByUsbDeviceKeyRepository removeAll()', () => {
  test(`
		Given a user has selected multiple usb device keys
    And they have selected multiple the vscode command to pair it with
    Then the repository can remove all records
    When the user attempts to remove all devices
	`, async () => {
    const expectedFirstCallInput = context.entity1.information.index;
    const expectedSecondCallInput = context.entity2.information.index;
    await repository.removeAll();
    const actualFirstCall =
      spies.extensionContext.globalState.update.mock.calls[0][0];
    const actualSecondCall =
      spies.extensionContext.globalState.update.mock.calls[1][0];
    expect(spies.extensionContext.globalState.update).toBeCalledTimes(2);
    expect(actualFirstCall).toEqual(expectedFirstCallInput);
    expect(actualSecondCall).toEqual(expectedSecondCallInput);
  });
});

describe('VsCodeCommandByUsbDeviceKeyRepository remove()', () => {
  test(`
		Given a user has selected a usb device key
    And they have selected the vscode command to pair it with
    Then the repository can remove am entity
    When the user attempts to remove it
	`, async () => {
    const expectedFirstCallInput = context.entity1.information.index;
    const expectedSecondCallInput = context.entity2.information.index;
    const expectedThirdCallInput = generateUsbDeviceKeyPressed(context);
    await repository.remove({
      usbDeviceInformation: context.entity1.information, // UsbDeviceInformationEntity;
      usbDeviceKey: context.request.usbDeviceKey, // Buffer;
      selectedVsCodeCommand: context.request.vscodeCommand, // string;
    });
    const actualFirstCall =
      spies.extensionContext.globalState.update.mock.calls[0][0];
    const actualSecondCall =
      spies.extensionContext.globalState.update.mock.calls[1][0];
    const actualThirdCall =
      spies.extensionContext.globalState.update.mock.calls[3][0];
    expect(spies.extensionContext.globalState.update).toBeCalledTimes(4);
    expect(actualFirstCall).toEqual(expectedFirstCallInput);
    expect(actualSecondCall).toEqual(expectedSecondCallInput);
    expect(actualThirdCall).toEqual(expectedThirdCallInput);
  });
});
