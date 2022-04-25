import { Entity } from '../infrastructure/Repository';
import { DataTransferObject } from './DataTransferObject';
import { DomainService } from './DomainService';

type Repository = never;

export abstract class ApplicationService<
  Event = unknown,
  Entities = Record<string, Entity>,
  Repositories = Record<string, Repository>,
  DS = DomainService<Entities>,
  DTO = DataTransferObject<unknown>,
> {
  protected repositories: Repositories;
  protected service: DS;
  constructor(args: { repositories: Repositories; domainService: DS }) {
    this.repositories = args.repositories;
    this.service = args.domainService;
  }
  public abstract aggregate: (event: Event) => Promise<DTO>;
}
