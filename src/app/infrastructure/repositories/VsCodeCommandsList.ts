import * as vscode from 'vscode';

import { EventEmitter } from 'events';

import {
  Entity,
  Repository,
} from '../../../dsl/architecture/onion/infrastructure/Repository';

type Dependencies = never;

export type VsCodeCommandsListEntities = Entity<{
  label: string;
}>[];

type Request = never;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VsCodeCommandsListRepositoryInterface
  extends Repository<Dependencies, Request, VsCodeCommandsListEntities> {}

export class VsCodeCommandsListRepository
  extends Repository<Dependencies, Request, VsCodeCommandsListEntities>
  implements VsCodeCommandsListRepositoryInterface
{
  read = () =>
    new Promise((resolve) => {
      vscode.commands
        .getCommands()
        .then((commands) => resolve(commands.map((label) => ({ label }))));
    }) as Promise<VsCodeCommandsListEntities>;
  update = (entity: VsCodeCommandsListEntities) => {
    return Promise.reject(
      'VsCodeCommandsListRepository::update has no implementation',
    );
  };
}
