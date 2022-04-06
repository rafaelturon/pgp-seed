import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

export interface IDiceEntropyProps {
  value: string;
}

export class SeedDiceEntropy extends ValueObject<IDiceEntropyProps> {
  public static minLength = 32;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: IDiceEntropyProps) {
    super(props);
  }

  private static isAppropriateLength(diceEntropy: string): boolean {
    return diceEntropy.length >= this.minLength;
  }

  public static create(props: IDiceEntropyProps): Result<SeedDiceEntropy> {
    const propsResult = Guard.againstNullOrUndefined(
      props.value,
      "diceEntropy"
    );
    if (!propsResult.succeeded) {
      return Result.fail<SeedDiceEntropy>(propsResult.message);
    } else {
      if (!this.isAppropriateLength(props.value)) {
        return Result.fail<SeedDiceEntropy>(
          "Seed dice entropy does not meet criteria [32 chars min]."
        );
      }
      return Result.ok<SeedDiceEntropy>(
        new SeedDiceEntropy({ value: props.value })
      );
    }
  }
}
