import { QuickPick, window } from 'vscode';
import { View } from '../../../../dsl/architecture/model-view-presenter/View';

export interface SelectUsbKeyTriggerViewInterface extends View<never, void> {
  display: () => Promise<void>;
}

export class SelectUsbKeyTriggerView
  extends View<never, void>
  implements SelectUsbKeyTriggerViewInterface
{
  private quickpick: QuickPick<any>;
  constructor() {
    super();
    this.quickpick = window.createQuickPick();
  }
  display = () => {
    this.quickpick.title = `Press your USB device's key 10 times`;
    this.quickpick.show();
    return Promise.resolve();
  };
  hide = () => this.quickpick.hide();
}
