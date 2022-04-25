import { ViewModel } from './ViewModel';

export abstract class View<T = ViewModel<unknown>, UserInput = unknown> {
  public abstract display: (model: T) => Promise<UserInput>;
  public abstract hide: () => void;
}
