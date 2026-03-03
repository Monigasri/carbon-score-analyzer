import { calculateBenchmark, type BenchmarkResult } from "@/lib/benchmarking";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, TreePine, BarChart3 } from "lucide-react";

interface Props {
  predictedEmission: number;
  monthlyUsers: number;
}

const BenchmarkPanel = ({ predictedEmission, monthlyUsers }: Props) => {
  const b = calculateBenchmark(predictedEmission, monthlyUsers);

  const badgeClass =
    b.badgeColor === "primary"
      ? "bg-primary/15 text-primary border-primary/30"
      : b.badgeColor === "chart-warning"
      ? "bg-chart-warning/15 text-chart-warning border-chart-warning/30"
      : "bg-destructive/15 text-destructive border-destructive/30";

  const cards = [
    {
      icon: BarChart3,
      label: "Industry Comparison",
      value: `${Math.abs(b.percentVsAverage)}% ${b.percentVsAverage <= 0 ? "below" : "above"} avg`,
      color: b.percentVsAverage <= 0 ? "text-primary" : "text-destructive",
    },
    {
      icon: DollarSign,
      label: "Annual Environmental Cost",
      value: `₹${b.annualCost.toLocaleString("en-IN")}`,
      color: "text-chart-warning",
    },
    {
      icon: TreePine,
      label: "Trees to Offset",
      value: `${b.treesRequired} trees/year`,
      color: "text-primary",
    },
    {
      icon: TrendingUp,
      label: "Annual Carbon Impact",
      value: `${b.annualCarbon} kg CO₂`,
      color: "text-foreground",
    },
  ];

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* Badge */}
      <div className="flex items-center gap-3">
        <Badge className={`px-4 py-1.5 text-sm font-display font-semibold ${badgeClass}`}>
          {b.badge}
        </Badge>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div
            key={c.label}
            className="bg-card rounded-xl shadow-card p-5 animate-scale-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <c.icon className={`w-5 h-5 ${c.color}`} />
              <span className="text-xs text-muted-foreground font-body uppercase tracking-wide">{c.label}</span>
            </div>
            <p className={`font-display text-lg font-bold ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenchmarkPanel;
