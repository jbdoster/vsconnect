import { ExtensionContext } from 'vscode';
import { Presenter } from '../../../../dsl/architecture/model-view-presenter/Presenter';
import {
  ActivateApplicationApplicationServiceInterface,
  DTO,
} from '../backend/ApplicationService';
import { ActivateApplicationView } from './View';

type Event = {
  extensionContext: ExtensionContext;
};

export interface ActivateApplicationPresenterInterface
  extends Presenter<
    ActivateApplicationApplicationServiceInterface,
    Event,
    DTO,
    void
  > {
  event: (event: Event) => Promise<DTO>;
}

export class ActivateApplicationPresenter
  extends Presenter<
    ActivateApplicationApplicationServiceInterface,
    Event,
    DTO,
    void
  >
  implements ActivateApplicationPresenterInterface
{
  protected applicationService: ActivateApplicationApplicationServiceInterface;
  protected view: ActivateApplicationView;
  constructor(
    applicationService: ActivateApplicationApplicationServiceInterface,
    view: ActivateApplicationView,
  ) {
    super(applicationService, view);
    this.applicationService = applicationService;
    this.view = view;
  }
  event = async (event: Event) => {
    const dto = await this.applicationService.aggregate(event);
    return dto;
  };
  onUserInput = () =>
    Promise.reject(
      'ActivateApplicationPresenter::onUserInput is not implemented.',
    );
}
