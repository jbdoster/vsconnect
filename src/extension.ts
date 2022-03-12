import {
  either as E,
  function as F,
  option as O,
  taskEither as TE,
  taskOption as TO,
} from "fp-ts";
import { Monad } from "fp-ts/lib/Monad";
import * as vscode from "vscode";

import { assignDeviceKeyAndVsCodeCommandInteractor } from "./library/infrastructure/Interactor";
import { DeviceEntity } from "./library/infrastructure/repositories/use-cases/list-devices/listDevices.entities";

export function activate(context: vscode.ExtensionContext) {
  console.log("vsconnect is now active!");
  type QuickPickDeviceHashMap = Record<string, DeviceEntity>;

  const setQuickPickSelectionHandler = (devices: DeviceEntity[]) => {
    const quickpick = vscode.window.createQuickPick();
    const quickPickDevicesHashMap: QuickPickDeviceHashMap = {};
    quickpick.items = devices.map((device) => {
      const label = `${device.deviceDescriptor.idVendor} - ${device.deviceDescriptor.idProduct}`;
      quickPickDevicesHashMap[label] = device;
      return { label };
    });
    quickpick.canSelectMany = false;
    quickpick.show();
    return new Promise((resolve) => {
      quickpick.onDidChangeSelection((selections) => {
        const label = selections[0].label;
        vscode.window.showInformationMessage(`Device chosen: ${label}`);
        resolve(quickPickDevicesHashMap[label]);
      });
    });
  };
  const f2 =
    (input: string): TO.TaskOption<string> =>
    async () => {
      return O.some(input + " f2");
    };
  const chainTask =
    <I = readonly unknown[], O = unknown>(
      task: (args: I) => Promise<O>,
      args: I
    ): TE.TaskEither<Error, O> =>
    async () => {
      return E.right(await task(args));
    };
  const disposable = vscode.commands.registerCommand(
    "extension.CHOOSE_DEVICE",
    () => {
      const either = assignDeviceKeyAndVsCodeCommandInteractor();
      console.log("devices", either);

      const result = F.pipe(
        either,
        E.match(
          (left) =>
            vscode.window.showErrorMessage(
              "Could not retrieve devices: \n" + left.message
            ),
          (right) =>
            F.pipe(right.devices, F.flow(setQuickPickSelectionHandler))
              .then((u) => {
                console.log(u);
                return { u };
              })
              .catch((e) => e)
        )
      );
      result.then(
        (fulfilled) => console.log("fulfilled", fulfilled),
        (rejected) => console.error("rejected", rejected)
      );
    }
  );

  context.subscriptions.push(disposable);
}
