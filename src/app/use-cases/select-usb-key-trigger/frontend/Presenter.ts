import { Presenter } from '../../../../dsl/architecture/model-view-presenter/Presenter';
import {
  DTO,
  SelectUsbKeyTriggerApplicationServiceInterface,
} from '../backend/ApplicationService';
import { SelectUsbKeyTriggerViewInterface } from './View';

export interface SelectUsbKeyTriggerPresenterInterface
  extends Presenter<
    SelectUsbKeyTriggerApplicationServiceInterface,
    never,
    DTO,
    never
  > {
  event: () => Promise<DTO>;
}

export class SelectUsbKeyTriggerPresenter
  extends Presenter<
    SelectUsbKeyTriggerApplicationServiceInterface,
    never,
    DTO,
    never
  >
  implements SelectUsbKeyTriggerPresenterInterface
{
  protected applicationService: SelectUsbKeyTriggerApplicationServiceInterface;
  protected view: SelectUsbKeyTriggerViewInterface;
  constructor(
    applicationService: SelectUsbKeyTriggerApplicationServiceInterface,
    view: SelectUsbKeyTriggerViewInterface,
  ) {
    super(applicationService, view);
    this.applicationService = applicationService;
    this.view = view;
  }
  event = async () => {
    await this.view.display();
    const dto = await this.applicationService.aggregate(undefined as never);
    this.view.hide();
    return dto;
  };
  onUserInput = () =>
    Promise.reject(
      'SelectUsbKeyTriggerPresenter::onUserInput is not implemented.',
    );
}
