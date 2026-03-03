import { predict, type PredictionInput, type PredictionResult } from "./predictions";

export interface SimulationInput {
  original: PredictionInput;
  reducePageSize: number; // percentage 0-100
  reduceApiCalls: number;
  reduceImages: number;
}

export interface SimulationResult {
  optimized: PredictionResult;
  original: PredictionResult;
  carbonSaved: number;
  percentReduction: number;
}

export function simulate(input: SimulationInput): SimulationResult {
  const originalResult = predict(input.original);

  const optimizedInput: PredictionInput = {
    ...input.original,
    page_size: input.original.page_size * (1 - input.reducePageSize / 100),
    api_calls: input.original.api_calls * (1 - input.reduceApiCalls / 100),
    images: input.original.images * (1 - input.reduceImages / 100),
  };

  const optimizedResult = predict(optimizedInput);

  const carbonSaved = Math.max(0, parseFloat((originalResult.predicted_carbon_emission - optimizedResult.predicted_carbon_emission).toFixed(2)));
  const percentReduction = originalResult.predicted_carbon_emission > 0
    ? parseFloat(((carbonSaved / originalResult.predicted_carbon_emission) * 100).toFixed(1))
    : 0;

  return { optimized: optimizedResult, original: originalResult, carbonSaved, percentReduction };
}
