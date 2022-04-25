import { Presenter } from '../../../../dsl/architecture/model-view-presenter/Presenter';
import { RemoveConnectedVsCodeCommandApplicationServiceInterface } from '../backend/ApplicationService';
import { RemoveConnectedVsCodeCommandView } from './View';

type DTO = void;

export type Event = {
  selectedVsCodeCommand: string;
};

export interface RemoveConnectedVsCodeCommandPresenterInterface
  extends Presenter<
    RemoveConnectedVsCodeCommandApplicationServiceInterface,
    Event,
    DTO,
    never
  > {
  event: (vscodeCommandsList: Event) => Promise<DTO>;
}

export class RemoveConnectedVsCodeCommandPresenter
  extends Presenter<
    RemoveConnectedVsCodeCommandApplicationServiceInterface,
    never,
    DTO,
    never
  >
  implements RemoveConnectedVsCodeCommandPresenterInterface
{
  protected view: RemoveConnectedVsCodeCommandView;
  protected applicationService: RemoveConnectedVsCodeCommandApplicationServiceInterface;
  constructor(
    applicationService: RemoveConnectedVsCodeCommandApplicationServiceInterface,
    view: RemoveConnectedVsCodeCommandView,
  ) {
    super(applicationService, view);
    this.applicationService = applicationService;
    this.view = view;
  }
  event = async (event: Event) => {
    if (!event.selectedVsCodeCommand) {
      console.warn(
        'RemoveConnectedVsCodeCommandPresenter no selected usb key index',
      );
      return;
    }
    await this.applicationService.aggregate(event);
    await this.view.display({
      disconnectedUsbKey: event.selectedVsCodeCommand,
    });
    this.view.hide();
  };
  onUserInput = () =>
    Promise.reject(
      'RemoveConnectedVsCodeCommandPresenter::onUserInput is not implemented.',
    );
}
