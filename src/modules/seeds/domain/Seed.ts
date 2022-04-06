import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { SeedId } from "./SeedId";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { SeedCreated } from "./events/seedCreated";

interface SeedProps {
  rawData: number[];
  score: number;
  entropyNumber: number;
  crackTimeDisplay: string;
}

export class Seed extends AggregateRoot<SeedProps> {
  get seedId(): SeedId {
    return SeedId.create(this._id).getValue();
  }

  private constructor(props: SeedProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(diceEntropy: string, id?: UniqueEntityID): Result<Seed> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: diceEntropy, argumentName: "diceEntropy" },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Seed>(guardResult.message);
    }
    const props: SeedProps = {
      rawData: undefined,
      score: 0,
      entropyNumber: 0,
      crackTimeDisplay: "",
    };

    const isNewSeed = !!id === false;
    const seed = new Seed({ ...props }, id);
    if (isNewSeed) {
      seed.addDomainEvent(new SeedCreated(seed));
    }
    return Result.ok<Seed>(seed);
  }
}
