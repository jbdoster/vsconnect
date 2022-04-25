import { Presenter } from '../../../../dsl/architecture/model-view-presenter/Presenter';
import { DTO as SelectUsbKeyDTO } from '../backend/ApplicationService';
import {
  // DTO,
  SelectConnectedUsbKeyApplicationServiceInterface,
} from '../backend/ApplicationService';
import {
  SelectConnectedUsbKeyView,
  SelectConnectedUsbKeyViewInterface,
} from './View';

type DTO = {
  selectedVsCodeCommand: string;
};

export type Event = never;

export interface SelectConnectedUsbKeyPresenterInterface
  extends Presenter<
    SelectConnectedUsbKeyApplicationServiceInterface,
    Event,
    DTO,
    never
  > {
  event: () => Promise<DTO>;
}

export class SelectConnectedUsbKeyPresenter
  extends Presenter<
    SelectConnectedUsbKeyApplicationServiceInterface,
    never,
    DTO,
    never
  >
  implements SelectConnectedUsbKeyPresenterInterface
{
  protected view: SelectConnectedUsbKeyView;
  protected applicationService: SelectConnectedUsbKeyApplicationServiceInterface;
  constructor(
    applicationService: SelectConnectedUsbKeyApplicationServiceInterface,
    view: SelectConnectedUsbKeyView,
  ) {
    super(applicationService, view);
    this.applicationService = applicationService;
    this.view = view;
  }
  event = async () => {
    const response = await this.applicationService.aggregate(null as never);

    await this.view.display([]);

    if (response.connectedUsbKeys.length < 1) {
      console.warn(
        'SelectConnectedUsbKeyPresenter -> event: no connected usb keys',
      );
      return Promise.resolve({
        selectedVsCodeCommand: '',
      });
    }

    const distinctVsCodeCommands = response.connectedUsbKeys
      .map((record) => record.vscodeCommand)
      .reduce((commands, command) => {
        const not = !commands.includes(command);
        if (not && command) commands.push(command);
        return commands;
      }, [] as string[]);

    const selectedVsCodeCommand = await this.view.display(
      distinctVsCodeCommands,
    );
    this.view.hide();
    return { selectedVsCodeCommand };
  };
  onUserInput = () =>
    Promise.reject(
      'SelectConnectedUsbKeyPresenter::onUserInput is not implemented.',
    );
}
