import { window } from 'vscode';
import { View } from '../../../../dsl/architecture/model-view-presenter/View';

export type RemoveConnectedVsCodeCommandViewModel = {
  disconnectedUsbKey: string;
};

export interface RemoveConnectedVsCodeCommandViewInterface
  extends View<RemoveConnectedVsCodeCommandViewModel, void> {
  display: (
    connectedUsbKeysList: RemoveConnectedVsCodeCommandViewModel,
  ) => Promise<void>;
}

export class RemoveConnectedVsCodeCommandView
  extends View<RemoveConnectedVsCodeCommandViewModel, void>
  implements RemoveConnectedVsCodeCommandViewInterface
{
  constructor() {
    super();
  }
  display = (viewModel: RemoveConnectedVsCodeCommandViewModel) => {
    const MESSAGE = `${viewModel.disconnectedUsbKey} disconnected`;
    window.showInformationMessage(MESSAGE);
    return Promise.resolve();
  };
  hide = () => null;
}
