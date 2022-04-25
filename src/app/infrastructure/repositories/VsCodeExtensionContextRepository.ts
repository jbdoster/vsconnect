import { ExtensionContext } from 'vscode';
import {
  Entity,
  Repository,
} from '../../../dsl/architecture/onion/infrastructure/Repository';

type Dependencies = never;

export type E = Entity<ExtensionContext>;

type Request = never;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UsbDeviceInformationRepositoryInterface
  extends Repository<Dependencies, Request, E> {}

export class UsbDevicesListRepository
  extends Repository<Dependencies, Request, E>
  implements UsbDeviceInformationRepositoryInterface
{
  private context: ExtensionContext;
  constructor() {
    super(null as never);
    this.context = {} as ExtensionContext;
  }
  read = () => {
    return Promise.resolve(this.context);
  };
  update = (entity: E) => {
    this.context = entity;
    return Promise.resolve();
  };
}
