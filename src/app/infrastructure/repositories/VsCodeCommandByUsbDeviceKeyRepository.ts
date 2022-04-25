import { ExtensionContext, window } from 'vscode';
import {
  Entity,
  Repository,
} from '../../../dsl/architecture/onion/infrastructure/Repository';
import { UsbDeviceInformationEntity } from './UsbDeviceInformationRepository';

type Dependencies = {
  context: ExtensionContext;
};

export type VsCodeCommandByUsbDeviceKeyEntity = Entity<{
  usbDeviceKeyPressed: Buffer;
  vscodeCommand: string;
  information: UsbDeviceInformationEntity;
}>;

export type Request =
  // TODO
  // better typing
  | (({
      usbDeviceInformation: UsbDeviceInformationEntity;
      usbDeviceKey: Buffer;
    } & {
      selectedVsCodeCommand: string;
    }) &
      any)
  | never;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VsCodeCommandByUsbDeviceKeyRepositoryInterface
  extends Repository<Dependencies, Request, VsCodeCommandByUsbDeviceKeyEntity> {
  readAll: () => Promise<VsCodeCommandByUsbDeviceKeyEntity[]>;
  removeAll: () => Promise<void>;
  remove: (request: Request) => Promise<void>;
}

export class VsCodeCommandByUsbDeviceKeyRepository
  extends Repository<Dependencies, Request, VsCodeCommandByUsbDeviceKeyEntity>
  implements VsCodeCommandByUsbDeviceKeyRepositoryInterface
{
  protected dependencies: Dependencies;
  constructor(dependencies: Dependencies) {
    super(dependencies);
    this.dependencies = dependencies;
  }
  read = (request: Request) => {
    const key = this.generateIndex(
      request.usbDeviceInformation,
      request.usbDeviceKey,
    );
    const entity = this.dependencies.context.globalState.get(
      key,
    ) as VsCodeCommandByUsbDeviceKeyEntity;
    return Promise.resolve(entity);
  };
  readAll = (): Promise<VsCodeCommandByUsbDeviceKeyEntity[]> => {
    const keys = this.dependencies.context.globalState.keys();
    const allConnections = keys.map(
      (key) =>
        this.dependencies.context.globalState.get(
          key,
        ) as VsCodeCommandByUsbDeviceKeyEntity,
    );
    return Promise.resolve(allConnections);
  };
  removeAll = () => {
    const keys = this.dependencies.context.globalState.keys();
    keys.forEach((key) =>
      this.dependencies.context.globalState.update(key, undefined),
    );
    return Promise.resolve();
  };
  remove = async (request: Request) => {
    this.removeAll();
    const allPreviousEntries = await this.readAll();
    const nonMatchingEntries = allPreviousEntries.filter(
      (command) => command.vscodeCommand !== request.selectedVsCodeCommand,
    );
    nonMatchingEntries.forEach((entry) => {
      // TODO
      // Store key as part of entity
      // So we don't have to generate the index again
      const key = this.generateIndex(
        entry.information,
        entry.usbDeviceKeyPressed,
      );
      this.dependencies.context.globalState.update(key, entry);
    });
  };
  update = (entity: VsCodeCommandByUsbDeviceKeyEntity) => {
    // TODO
    // Update entity contract and store index
    const key = this.generateIndex(
      entity.information,
      entity.usbDeviceKeyPressed,
    );
    this.dependencies.context.globalState.update(key, {
      information: entity.information,
      usbDeviceKeyPressed: entity.usbDeviceKeyPressed,
      vscodeCommand: entity.vscodeCommand,
    });
    return Promise.resolve();
  };
  private generateIndex = (
    usbDeviceInformation: Request['usbDeviceInformation'],
    usbDeviceKey: Request['usbDeviceKey'],
  ): string => {
    let buffer: number[] = [];
    for (const value of usbDeviceKey.entries()) {
      buffer = buffer.concat(value);
    }
    return `${usbDeviceInformation.index}::${buffer.toString()}`;
  };
}
