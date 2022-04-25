import { Presenter } from '../../../../dsl/architecture/model-view-presenter/Presenter';
import { DTO as SelectUsbKeyDTO } from '../../select-usb-key-trigger/backend/ApplicationService';
import {
  DTO,
  SelectVsCodeCommandApplicationServiceInterface,
} from '../backend/ApplicationService';
import {
  SelectVsCodeCommandView,
  SelectVsCodeCommandViewInterface,
} from './View';

export type Event = {
  selectUsbKeyDTO: SelectUsbKeyDTO;
};

export interface SelectVsCodeCommandPresenterInterface
  extends Presenter<
    SelectVsCodeCommandApplicationServiceInterface,
    Event,
    DTO,
    never
  > {
  event: (vscodeCommandsList: Event) => Promise<DTO>;
}

export class SelectVsCodeCommandPresenter
  extends Presenter<
    SelectVsCodeCommandApplicationServiceInterface,
    never,
    DTO,
    never
  >
  implements SelectVsCodeCommandPresenterInterface
{
  protected view: SelectVsCodeCommandView;
  protected applicationService: SelectVsCodeCommandApplicationServiceInterface;
  constructor(
    applicationService: SelectVsCodeCommandApplicationServiceInterface,
    view: SelectVsCodeCommandView,
  ) {
    super(applicationService, view);
    this.applicationService = applicationService;
    this.view = view;
  }
  event = async (event: Event) => {
    const vscodeCommand = await this.view.display(
      event.selectUsbKeyDTO.vsCodeCommandsListEntities,
    );
    this.view.hide();
    return this.applicationService.aggregate({
      ...event,
      vscodeCommand,
    });
  };
  onUserInput = () =>
    Promise.reject(
      'SelectVsCodeCommandPresenter::onUserInput is not implemented.',
    );
}
