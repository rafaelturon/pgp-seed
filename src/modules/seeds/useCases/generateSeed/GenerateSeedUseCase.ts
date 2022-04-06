import { AppError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Seed } from "../../domain/Seed";
import { SeedDiceEntropy } from "../../domain/SeedDiceEntropy";

type Response = Either<
    AppError.UnexpectedError,
    Result<Seed>
>

export class GenerateSeedUseCase implements UseCase<string, Promise<Response>> {
    async execute(diceSequenceEntroy?: string): Promise<Response> {
        const diceEntropyOrError = SeedDiceEntropy.create({ value: diceSequenceEntroy });
        const dtoResult = Result.combine([
            diceEntropyOrError
        ]);
        if (dtoResult.isFailure) {
            return left(Result.fail<void>(dtoResult.error)) as Response;
        }

        const diceEntropy: SeedDiceEntropy = diceEntropyOrError.getValue();
        try {
            const seedOrError: Result<Seed> = Seed.create(diceEntropy.value);
            return right(Result.ok<Seed>(seedOrError.getValue()));
        } catch(err) {
            return left(new AppError.UnexpectedError(err)) as Response;
        }
    }
}