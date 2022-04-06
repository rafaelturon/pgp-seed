import { GenerateSeedUseCase } from "./modules/seeds/useCases/generateSeed/GenerateSeedUseCase";

export async function start() {
  const generateSeed: GenerateSeedUseCase = new GenerateSeedUseCase();
  //const result = await generateSeed.execute("12313131123131311231313112313131");
  const result = await generateSeed.execute("123131311231313");
  if (result.isLeft()) {
    const error = result.value;

    switch (error.constructor) {
      default:
        console.log(error.errorValue());
    }
  } else {
    console.log(result.value.getValue().id);
  }
}
start();
