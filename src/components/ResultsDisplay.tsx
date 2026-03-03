import type { PredictionResult } from "@/lib/predictions";
import ForecastChart from "./ForecastChart";
import ImportanceChart from "./ImportanceChart";
import { Leaf, Zap, Gauge, Star } from "lucide-react";

interface Props {
  result: PredictionResult;
}

const METRICS = (r: PredictionResult) => [
  { icon: Leaf, label: "Carbon Emission", value: `${r.predicted_carbon_emission} kg CO₂`, color: "text-primary" },
  { icon: Zap, label: "Energy Usage", value: `${r.energy_usage_kwh} kWh`, color: "text-chart-warning" },
  { icon: Gauge, label: "Green Score", value: `${r.green_score}/100`, color: "text-primary" },
  { icon: Star, label: "Rating", value: r.rating, color: "text-foreground" },
];

const ResultsDisplay = ({ result }: Props) => {
  const metrics = METRICS(result);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className="bg-card rounded-xl shadow-card p-5 animate-scale-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <m.icon className={`w-5 h-5 ${m.color}`} />
              <span className="text-xs text-muted-foreground font-body uppercase tracking-wide">{m.label}</span>
            </div>
            <p className={`font-display text-xl font-bold ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Green Score Bar */}
      <div className="bg-card rounded-xl shadow-card p-6">
        <h3 className="font-display font-semibold text-foreground mb-3">Sustainability Score</h3>
        <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${result.green_score}%`,
              background: result.green_score >= 60
                ? "hsl(var(--primary))"
                : result.green_score >= 30
                ? "hsl(var(--chart-warning))"
                : "hsl(var(--destructive))",
            }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-muted-foreground font-body">
          <span>Critical</span>
          <span>Excellent</span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ForecastChart data={result.six_month_forecast} />
        <ImportanceChart data={result.feature_importance} />
      </div>

      {/* Suggestions */}
      <div className="bg-card rounded-xl shadow-card p-6">
        <h3 className="font-display font-semibold text-foreground mb-4">💡 Optimization Suggestions</h3>
        <ul className="space-y-3">
          {result.suggestions.map((s, i) => (
            <li
              key={i}
              className="flex gap-3 items-start animate-slide-in"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full gradient-hero text-primary-foreground text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-foreground font-body leading-relaxed">{s}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultsDisplay;
