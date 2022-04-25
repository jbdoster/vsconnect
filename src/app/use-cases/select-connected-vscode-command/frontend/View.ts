import { QuickInput, QuickPick, QuickPickItem, window } from 'vscode';
import { View } from '../../../../dsl/architecture/model-view-presenter/View';

export type SelectConnectedUsbKeyViewModel = string[];

export type ConnectedUsbKeyUpdate = string;

export interface SelectConnectedUsbKeyViewInterface
  extends View<SelectConnectedUsbKeyViewModel, ConnectedUsbKeyUpdate> {
  display: (
    connectedUsbKeysList: SelectConnectedUsbKeyViewModel,
  ) => Promise<ConnectedUsbKeyUpdate>;
}

export class SelectConnectedUsbKeyView
  extends View<SelectConnectedUsbKeyViewModel, ConnectedUsbKeyUpdate>
  implements SelectConnectedUsbKeyViewInterface
{
  private quickpick: QuickPick<any>;
  constructor() {
    super();
    this.quickpick = window.createQuickPick();
  }
  display = (connectedUsbKeys: SelectConnectedUsbKeyViewModel) => {
    if (connectedUsbKeys.length < 1) {
      window.showInformationMessage('There are no connections to remove.');
      return Promise.resolve('');
    }
    this.quickpick.canSelectMany = false;
    this.quickpick.items = [
      {
        label: 'All Mapped Devices',
      },
      ...connectedUsbKeys.map((label) => ({ label })),
    ];
    this.quickpick.title = `Choose a connected key to remove`;
    this.quickpick.show();

    return new Promise<ConnectedUsbKeyUpdate>((resolve) =>
      this.quickpick.onDidAccept(() => {
        const connectedUsbKey = this.quickpick.activeItems[0].label;
        console.log('user choose to remove key: ', connectedUsbKey);
        resolve(connectedUsbKey);
      }),
    );
  };
  hide = () => this.quickpick.hide();
}
