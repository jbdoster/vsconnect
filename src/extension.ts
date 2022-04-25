import { readFileSync } from 'fs';
import * as vscode from 'vscode';

import { Commands } from './dsl/vscode/Commands';

import { ActivateApplicationApplicationService } from './app/use-cases/activate-application/backend/ApplicationService';
import { ActivateApplicationDomainService } from './app/use-cases/activate-application/backend/DomainService';
import { ActivateApplicationPresenter } from './app/use-cases/activate-application/frontend/Presenter';
import { ActivateApplicationDomainModel } from './app/use-cases/activate-application/backend/DomainModel';

import { SelectUsbKeyTriggerApplicationService } from './app/use-cases/select-usb-key-trigger/backend/ApplicationService';
import { SelectUsbKeyTriggerDomainModel } from './app/use-cases/select-usb-key-trigger/backend/DomainModel';
import { SelectUsbKeyTriggerDomainService } from './app/use-cases/select-usb-key-trigger/backend/DomainService';
import { SelectUsbKeyTriggerPresenter } from './app/use-cases/select-usb-key-trigger/frontend/Presenter';

import { SelectVsCodeCommandApplicationService } from './app/use-cases/select-vscode-command/backend/ApplicationService';
import { SelectVsCodeCommandDomainModel } from './app/use-cases/select-vscode-command/backend/DomainModel';
import { SelectVsCodeCommandDomainService } from './app/use-cases/select-vscode-command/backend/DomainService';
import { SelectVsCodeCommandPresenter } from './app/use-cases/select-vscode-command/frontend/Presenter';
import { SelectVsCodeCommandView } from './app/use-cases/select-vscode-command/frontend/View';

import { SelectConnectedUsbKeyView } from './app/use-cases/select-connected-vscode-command/frontend/View';
import { SelectConnectedUsbKeyPresenter } from './app/use-cases/select-connected-vscode-command/frontend/Presenter';
import { SelectConnectedUsbKeyApplicationService } from './app/use-cases/select-connected-vscode-command/backend/ApplicationService';
import { SelectConnectedUsbKeyDomainService } from './app/use-cases/select-connected-vscode-command/backend/DomainService';
import { SelectConnectedUsbKeyDomainModel } from './app/use-cases/select-connected-vscode-command/backend/DomainModel';

import { RemoveConnectedVsCodeCommandView } from './app/use-cases/remove-connected-vscode-command/frontend/View';
import { RemoveConnectedVsCodeCommandPresenter } from './app/use-cases/remove-connected-vscode-command/frontend/Presenter';
import { RemoveConnectedVsCodeCommandApplicationService } from './app/use-cases/remove-connected-vscode-command/backend/ApplicationService';
import { RemoveConnectedVsCodeCommandDomainService } from './app/use-cases/remove-connected-vscode-command/backend/DomainService';
import { RemoveConnectedVsCodeCommandDomainModel } from './app/use-cases/remove-connected-vscode-command/backend/DomainModel';

import { UsbDeviceEndpointBrokerRepository } from './app/infrastructure/repositories/UsbDeviceEndpointBrokerRepository';
import { UsbDeviceInformationRepository } from './app/infrastructure/repositories/UsbDeviceInformationRepository';
import { UsbDevicesListRepository } from './app/infrastructure/repositories/UsbDevicesListRepository';
import { VsCodeCommandByUsbDeviceKeyRepository } from './app/infrastructure/repositories/VsCodeCommandByUsbDeviceKeyRepository';
import { VsCodeCommandsListRepository } from './app/infrastructure/repositories/VsCodeCommandsList';
import { SelectUsbKeyTriggerView } from './app/use-cases/select-usb-key-trigger/frontend/View';
import { ActivateApplicationView } from './app/use-cases/activate-application/frontend/View';

export async function activate(context: vscode.ExtensionContext) {
  console.log('VS Connect Activated');
  /*
    TODO
    Containerize use case activities with initialization method
    Preparation for integration tests
  */
  function setEnvironment(): void {
    return readFileSync('.env')
      .toString()
      .split('\n')
      .filter((line) => !!line)
      .forEach((line) => {
        const tuple = line.split('\n');
        process.env[tuple[0]] = tuple[1];
      });
  }

  const usbDeviceEndpointBrokerRepository =
    new UsbDeviceEndpointBrokerRepository();
  const vsCodeCommandByUsbDeviceKeyRepository =
    new VsCodeCommandByUsbDeviceKeyRepository({
      context,
    });

  const activateApplicationView = new ActivateApplicationView();
  const activateApplicationPresenter = new ActivateApplicationPresenter(
    new ActivateApplicationApplicationService({
      domainService: new ActivateApplicationDomainService(
        new ActivateApplicationDomainModel(),
      ),
      repositories: {
        UsbDeviceEndpointBrokerRepository: usbDeviceEndpointBrokerRepository,
        UsbDeviceInformationRepository: new UsbDeviceInformationRepository(
          null as never,
        ),
        UsbDevicesListRepository: new UsbDevicesListRepository(null as never),
        VsCodeCommandByUsbDeviceKeyRepository:
          vsCodeCommandByUsbDeviceKeyRepository,
      },
    }),
    activateApplicationView,
  );

  const selectUsbKeyTriggerView = new SelectUsbKeyTriggerView();
  const selectUsbKeyTriggerPresenter = new SelectUsbKeyTriggerPresenter(
    new SelectUsbKeyTriggerApplicationService({
      domainService: new SelectUsbKeyTriggerDomainService(
        new SelectUsbKeyTriggerDomainModel(),
      ),
      repositories: {
        UsbDeviceEndpointBrokerRepository: usbDeviceEndpointBrokerRepository,
        UsbDeviceInformationRepository: new UsbDeviceInformationRepository(
          null as never,
        ),
        UsbDevicesListRepository: new UsbDevicesListRepository(null as never),
        VsCodeCommandByUsbDeviceKeyRepository:
          vsCodeCommandByUsbDeviceKeyRepository,
        VsCodeCommandsListRepository: new VsCodeCommandsListRepository(
          null as never,
        ),
      },
    }),
    selectUsbKeyTriggerView,
  );

  const selectVsCodeCommandView = new SelectVsCodeCommandView();
  const selectVsCodeCommandPresenter = new SelectVsCodeCommandPresenter(
    new SelectVsCodeCommandApplicationService({
      domainService: new SelectVsCodeCommandDomainService(
        new SelectVsCodeCommandDomainModel(),
      ),
      repositories: {
        UsbDeviceEndpointBrokerRepository: usbDeviceEndpointBrokerRepository,
        UsbDeviceInformationRepository: new UsbDeviceInformationRepository(
          null as never,
        ),
        UsbDevicesListRepository: new UsbDevicesListRepository(null as never),
        VsCodeCommandByUsbDeviceKeyRepository:
          vsCodeCommandByUsbDeviceKeyRepository,
        VsCodeCommandsListRepository: new VsCodeCommandsListRepository(
          null as never,
        ),
      },
    }),
    selectVsCodeCommandView,
  );

  const selectConnectedUsbKeyView = new SelectConnectedUsbKeyView();
  const selectConnectedUsbKeyPresenter = new SelectConnectedUsbKeyPresenter(
    new SelectConnectedUsbKeyApplicationService({
      domainService: new SelectConnectedUsbKeyDomainService(
        new SelectConnectedUsbKeyDomainModel(),
      ),
      repositories: {
        VsCodeCommandByUsbDeviceKeyRepository:
          vsCodeCommandByUsbDeviceKeyRepository,
      },
    }),
    selectConnectedUsbKeyView,
  );

  const removeConnectedUsbKeyView = new RemoveConnectedVsCodeCommandView();
  const removeConnectedUsbKeyPresenter =
    new RemoveConnectedVsCodeCommandPresenter(
      new RemoveConnectedVsCodeCommandApplicationService({
        domainService: new RemoveConnectedVsCodeCommandDomainService(
          new RemoveConnectedVsCodeCommandDomainModel(),
        ),
        repositories: {
          VsCodeCommandByUsbDeviceKeyRepository:
            vsCodeCommandByUsbDeviceKeyRepository,
        },
      }),
      removeConnectedUsbKeyView,
    );

  await activateApplicationPresenter.event({
    extensionContext: context,
  });

  const connect = vscode.commands.registerCommand(
    Commands.CONNECT,
    async () => {
      const selectUsbKeyTriggerDTO = await selectUsbKeyTriggerPresenter.event();

      const selectVsCodeCommandDTO = await selectVsCodeCommandPresenter.event({
        selectUsbKeyDTO: selectUsbKeyTriggerDTO,
      });

      // TODO
      // Make Completion Use Case
      // Put this in view display
      // We can continue the train choo-choo!
      vscode.window.showInformationMessage(
        `${selectVsCodeCommandDTO.vscodeCommand} is now connected!`,
      );
    },
  );

  const removeConnectedKey = vscode.commands.registerCommand(
    Commands.REMOVE_CONNECTED_VSCODE_COMMAND,
    async () => {
      const selectConnectedUsbKeyInput =
        await selectConnectedUsbKeyPresenter.event();

      console.log(
        `user selected to remove: ${selectConnectedUsbKeyInput.selectedVsCodeCommand}`,
      );

      await removeConnectedUsbKeyPresenter.event({
        selectedVsCodeCommand: selectConnectedUsbKeyInput.selectedVsCodeCommand,
      });

      console.log(
        `removed: ${selectConnectedUsbKeyInput.selectedVsCodeCommand}`,
      );
    },
  );

  context.subscriptions.push(connect, removeConnectedKey);
}
