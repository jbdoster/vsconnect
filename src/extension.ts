import * as vscode from "vscode";

import { assignDeviceKeyAndVsCodeCommandInteractor } from "./library/infrastructure/Interactor";

export function activate(context: vscode.ExtensionContext) {
  console.log("vsconnect is now active!");

  const disposable = vscode.commands.registerCommand(
    "extension.CHOOSE_DEVICE",
    () => {
      // The code you place here will be executed every time your command is executed
      const either = assignDeviceKeyAndVsCodeCommandInteractor();
      console.log("devices", either);
    }
  );

  context.subscriptions.push(disposable);
}
