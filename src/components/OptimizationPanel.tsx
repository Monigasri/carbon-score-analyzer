import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { simulate, type SimulationResult } from "@/lib/simulation";
import type { PredictionInput, PredictionResult } from "@/lib/predictions";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingDown, Leaf, Zap } from "lucide-react";

interface Props {
  originalInput: PredictionInput;
  originalResult: PredictionResult;
}

const OptimizationPanel = ({ originalInput, originalResult }: Props) => {
  const [reducePageSize, setReducePageSize] = useState(0);
  const [reduceApiCalls, setReduceApiCalls] = useState(0);
  const [reduceImages, setReduceImages] = useState(0);
  const [sim, setSim] = useState<SimulationResult | null>(null);

  useEffect(() => {
    if (reducePageSize === 0 && reduceApiCalls === 0 && reduceImages === 0) {
      setSim(null);
      return;
    }
    const result = simulate({
      original: originalInput,
      reducePageSize,
      reduceApiCalls,
      reduceImages,
    });
    setSim(result);
  }, [reducePageSize, reduceApiCalls, reduceImages, originalInput]);

  const comparisonData = [
    {
      label: "Current",
      emission: originalResult.predicted_carbon_emission,
      type: "current",
    },
    {
      label: "Optimized",
      emission: sim?.optimized.predicted_carbon_emission ?? originalResult.predicted_carbon_emission,
      type: "optimized",
    },
  ];

  return (
    <div className="bg-card rounded-xl shadow-card p-6 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-display font-bold text-foreground text-lg">Optimization Simulator</h3>
          <p className="text-xs text-muted-foreground font-body">Drag sliders to see projected savings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <SliderControl label="Reduce Page Size" value={reducePageSize} onChange={setReducePageSize} />
        <SliderControl label="Reduce API Calls" value={reduceApiCalls} onChange={setReduceApiCalls} />
        <SliderControl label="Reduce Images" value={reduceImages} onChange={setReduceImages} />
      </div>

      {/* Impact Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <TrendingDown className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-2xl font-display font-bold text-primary">
            {sim ? `${sim.percentReduction}%` : "0%"}
          </p>
          <p className="text-xs text-muted-foreground font-body">Reduction</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <Leaf className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-2xl font-display font-bold text-primary">
            {sim ? `${sim.carbonSaved}` : "0"} <span className="text-sm">kg</span>
          </p>
          <p className="text-xs text-muted-foreground font-body">CO₂ Saved</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <Zap className="w-5 h-5 text-chart-warning mx-auto mb-1" />
          <p className="text-2xl font-display font-bold text-foreground">
            {sim ? sim.optimized.predicted_carbon_emission : originalResult.predicted_carbon_emission}
            <span className="text-sm"> kg</span>
          </p>
          <p className="text-xs text-muted-foreground font-body">New Emission</p>
        </div>
      </div>

      {/* Before vs After Chart */}
      <div>
        <h4 className="font-display font-semibold text-foreground mb-3 text-sm">Current vs Optimized</h4>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={comparisonData} barSize={60}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            />
            <Bar dataKey="emission" radius={[6, 6, 0, 0]}>
              {comparisonData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.type === "current" ? "hsl(var(--chart-warning))" : "hsl(var(--primary))"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const SliderControl = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-body text-foreground font-medium">{label}</span>
      <span className="text-sm font-display font-bold text-primary">{value}%</span>
    </div>
    <Slider
      value={[value]}
      onValueChange={(v) => onChange(v[0])}
      max={80}
      step={5}
      className="w-full"
    />
  </div>
);

export default OptimizationPanel;
