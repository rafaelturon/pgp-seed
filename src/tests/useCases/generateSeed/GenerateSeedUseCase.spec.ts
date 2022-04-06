import { GenerateSeedUseCase } from "../../../modules/seeds/useCases/generateSeed/GenerateSeedUseCase";

describe("GenerateSeed", () => {
  it("should create seed with valid id", async () => {
    const useCase: GenerateSeedUseCase = new GenerateSeedUseCase();
    const result = await useCase.execute("12313131123131311231313112313131");
    //const result = await useCase.execute("1231313112313131")
    if (result.isRight()) {
      expect(result.value.getValue().id).not.toBeUndefined();
    } else {
      const error = result.value;

      switch (error.constructor) {
        default:
          expect(error.errorValue()).toBeNull();
      }
    }
  });
});
