import { once } from 'events';
import { DomainService } from '../../../../dsl/architecture/onion/core/DomainService';
import {
  UsbDeviceBrokerEntity,
  UsbDeviceKeyPressEventData,
} from '../../../infrastructure/repositories/UsbDeviceEndpointBrokerRepository';

import {
  SelectUsbKeyTriggerDomainModel,
  SelectUsbKeyTriggerDomainModelInterface,
  ValueObjects,
} from './DomainModel';

export type Context = {
  usbDeviceBroker: UsbDeviceBrokerEntity;
};

type DTO = {
  usbDeviceKeyPressDataEventList: UsbDeviceKeyPressEventData[];
};

export interface SelectUsbKeyTriggerDomainServiceInterface
  extends DomainService<
    Context,
    DTO,
    ValueObjects,
    SelectUsbKeyTriggerDomainModel
  > {
  update: (data: Context) => Promise<DTO>;
}

export class SelectUsbKeyTriggerDomainService
  extends DomainService<
    Context,
    DTO,
    ValueObjects,
    SelectUsbKeyTriggerDomainModel
  >
  implements SelectUsbKeyTriggerDomainServiceInterface
{
  protected model: SelectUsbKeyTriggerDomainModelInterface;
  constructor(model: SelectUsbKeyTriggerDomainModelInterface) {
    super(model);
    this.model = model;
  }
  update = async (context: Context) => {
    const { usbDeviceBroker } = context;

    const usbDeviceKeyPressDataEventList = [];

    let numberOfEntries = 20;
    while (numberOfEntries > 0) {
      const [usbDeviceKeyPressEventData] = await once(
        usbDeviceBroker.broker,
        'data',
      );
      usbDeviceKeyPressDataEventList.push(usbDeviceKeyPressEventData);
      numberOfEntries -= 1;
    }

    return {
      usbDeviceKeyPressDataEventList,
    };
  };

  // TODO
  validate = () =>
    Promise.reject(
      'SelectUsbKeyTriggerDomainService::validate has no implementation',
    );
}
