export interface BenchmarkResult {
  category: "low" | "average" | "high";
  badge: string;
  badgeColor: "primary" | "chart-warning" | "destructive";
  percentVsAverage: number; // negative = below average (good)
  annualCarbon: number; // kg CO₂ per year
  annualCost: number; // ₹ cost
  treesRequired: number;
}

// Industry benchmarks (kg CO₂ per session-equivalent)
const BENCHMARKS = {
  low: 5,
  average: 15,
  high: 30,
};

const COST_PER_KG_CO2 = 86; // ₹ per kg CO₂ (India carbon price estimate)
const KG_CO2_PER_TREE_PER_YEAR = 22; // avg tree absorbs ~22kg CO₂/year

export function calculateBenchmark(predictedEmission: number, monthlyUsers: number): BenchmarkResult {
  // Determine category
  let category: BenchmarkResult["category"];
  let badge: string;
  let badgeColor: BenchmarkResult["badgeColor"];

  if (predictedEmission <= BENCHMARKS.low) {
    category = "low";
    badge = "Efficient ✅";
    badgeColor = "primary";
  } else if (predictedEmission <= BENCHMARKS.average) {
    category = "average";
    badge = "Above Industry Average ⚠️";
    badgeColor = "chart-warning";
  } else {
    category = "high";
    badge = "High Emission Risk 🔴";
    badgeColor = "destructive";
  }

  const percentVsAverage = parseFloat((((predictedEmission - BENCHMARKS.average) / BENCHMARKS.average) * 100).toFixed(1));

  // Annual impact: emission per prediction × 12 months
  const annualCarbon = parseFloat((predictedEmission * 12).toFixed(2));
  const annualCost = parseFloat((annualCarbon * COST_PER_KG_CO2).toFixed(0));
  const treesRequired = Math.max(1, Math.ceil(annualCarbon / KG_CO2_PER_TREE_PER_YEAR));

  return { category, badge, badgeColor, percentVsAverage, annualCarbon, annualCost, treesRequired };
}
