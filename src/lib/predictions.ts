// Client-side carbon emission prediction engine
// Simulates the RandomForestRegressor model using a weighted formula

export interface PredictionInput {
  page_size: number;
  api_calls: number;
  images: number;
  monthly_users: number;
  session_time: number;
  server_response_time: number;
}

export interface PredictionResult {
  predicted_carbon_emission: number;
  energy_usage_kwh: number;
  green_score: number;
  rating: string;
  six_month_forecast: { month: string; emission: number }[];
  feature_importance: { feature: string; importance: number }[];
  suggestions: string[];
}

const FEATURE_WEIGHTS = {
  page_size: 0.25,
  api_calls: 0.20,
  images: 0.15,
  monthly_users: 0.18,
  session_time: 0.10,
  server_response_time: 0.12,
};

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

export function predict(input: PredictionInput): PredictionResult {
  // Carbon emission formula (simulating trained model output)
  const carbonEmission =
    input.page_size * 0.8 +
    input.api_calls * 0.15 +
    input.images * 0.3 +
    input.monthly_users * 0.002 +
    input.session_time * 0.1 +
    input.server_response_time * 0.005 +
    (Math.random() * 0.5 - 0.25); // noise

  const predictedEmission = Math.max(0, parseFloat(carbonEmission.toFixed(2)));

  // Energy usage estimate (kWh)
  const energyKwh = parseFloat((predictedEmission * 0.42).toFixed(3));

  // Green score (0-100, lower emission = higher score)
  const maxExpected = 50;
  const greenScore = Math.max(0, Math.min(100, Math.round(100 - (predictedEmission / maxExpected) * 100)));

  // Rating
  let rating: string;
  if (greenScore >= 80) rating = "Excellent 🌿";
  else if (greenScore >= 60) rating = "Good 🍃";
  else if (greenScore >= 40) rating = "Average ⚠️";
  else if (greenScore >= 20) rating = "Poor 🔴";
  else rating = "Critical 🚨";

  // 6-month forecast with 10% monthly traffic growth
  const forecast = MONTH_NAMES.map((month, i) => ({
    month,
    emission: parseFloat((predictedEmission * Math.pow(1.1, i)).toFixed(2)),
  }));

  // Feature importance (normalized weights with slight randomness)
  const features = Object.entries(FEATURE_WEIGHTS).map(([feature, weight]) => ({
    feature: feature.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    importance: parseFloat((weight + (Math.random() * 0.04 - 0.02)).toFixed(3)),
  }));
  features.sort((a, b) => b.importance - a.importance);

  // Top 3 suggestions based on highest importance features
  const suggestionMap: Record<string, string> = {
    "Page Size": "Optimize page assets — compress images, minify JS/CSS, and enable lazy loading to reduce page weight.",
    "Api Calls": "Reduce API calls by implementing caching, batching requests, and using GraphQL or pagination.",
    "Images": "Compress images using WebP/AVIF formats, implement responsive images, and use CDN delivery.",
    "Monthly Users": "Implement edge caching and CDN to serve users from closer locations, reducing server load.",
    "Session Time": "Optimize user flows to reduce unnecessary page loads and improve task completion speed.",
    "Server Response Time": "Optimize backend queries, use connection pooling, and implement server-side caching.",
  };

  const suggestions = features
    .slice(0, 3)
    .map(f => suggestionMap[f.feature] || `Optimize ${f.feature.toLowerCase()} to reduce carbon footprint.`);

  return {
    predicted_carbon_emission: predictedEmission,
    energy_usage_kwh: energyKwh,
    green_score: greenScore,
    rating,
    six_month_forecast: forecast,
    feature_importance: features,
    suggestions,
  };
}
