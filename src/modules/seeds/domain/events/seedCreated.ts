import { Seed } from "../Seed";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";

export class SeedCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public seed: Seed;

  constructor(seed: Seed) {
    this.dateTimeOccurred = new Date();
    this.seed = seed;
  }

  getAggregateId(): UniqueEntityID {
    return this.seed.id;
  }
}
