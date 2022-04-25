import { ApplicationService } from '../onion/core/ApplicationService';
import { DataTransferObject } from '../onion/core/DataTransferObject';
import { View } from './View';

export type ViewModel<T = unknown> = T;

export abstract class Presenter<
  AS = ApplicationService,
  Event = unknown,
  DTO = DataTransferObject,
  VM = ViewModel,
  UserInput = unknown,
> {
  protected service: AS;
  protected view: View<VM>;
  constructor(service: AS, view: View<VM>) {
    this.service = service;
    this.view = view;
  }
  public abstract event: (event: Event) => Promise<DTO>;
  protected abstract onUserInput: (userInput: UserInput) => void | never;
}
