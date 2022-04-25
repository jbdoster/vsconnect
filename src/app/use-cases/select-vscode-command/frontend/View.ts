import { QuickInput, QuickPick, QuickPickItem, window } from 'vscode';
import { View } from '../../../../dsl/architecture/model-view-presenter/View';

export type SelectVsCodeCommandViewModel = QuickPickItem[];

export type VsCodeCommandUpdate = string;

export interface SelectVsCodeCommandViewInterface
  extends View<SelectVsCodeCommandViewModel, VsCodeCommandUpdate> {
  display: (
    vscodeCommandsList: SelectVsCodeCommandViewModel,
  ) => Promise<VsCodeCommandUpdate>;
}

export class SelectVsCodeCommandView
  extends View<SelectVsCodeCommandViewModel, VsCodeCommandUpdate>
  implements SelectVsCodeCommandViewInterface
{
  private quickpick: QuickPick<any>;
  constructor() {
    super();
    this.quickpick = window.createQuickPick();
  }
  display = (vscodeCommands: SelectVsCodeCommandViewModel) => {
    this.quickpick.canSelectMany = false;
    this.quickpick.items = vscodeCommands;
    this.quickpick.title = `Choose a VSCODE command`;
    this.quickpick.show();

    return new Promise<VsCodeCommandUpdate>((resolve) =>
      this.quickpick.onDidAccept(() => {
        const vscodeCommand = this.quickpick.activeItems[0].label;
        console.log('user accepted command', vscodeCommand);
        resolve(vscodeCommand);
      }),
    );
  };
  hide = () => this.quickpick.hide();
}
