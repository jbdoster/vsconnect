import { window } from 'vscode';
import { View } from '../../../../dsl/architecture/model-view-presenter/View';

export interface ActivateApplicationViewInterface extends View<never, void> {
  display: () => Promise<void>;
}

export class ActivateApplicationView
  extends View<never, void>
  implements ActivateApplicationViewInterface
{
  display = async () => {
    // TODO
    // Check user's settings to see if this is silenced first
    window.showInformationMessage(
      'VSCONNECT is now listening to your USB devices',
    );
  };
  hide = () => null;
}
