import { useState } from "react";
import Navbar from "@/components/Navbar";
import PredictionForm from "@/components/PredictionForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import OptimizationPanel from "@/components/OptimizationPanel";
import BenchmarkPanel from "@/components/BenchmarkPanel";
import { predict, type PredictionInput, type PredictionResult } from "@/lib/predictions";
import { saveToHistory } from "@/lib/history";
import { Switch } from "@/components/ui/switch";
import { Leaf, FileText } from "lucide-react";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [lastInput, setLastInput] = useState<PredictionInput | null>(null);
  const [optimizationMode, setOptimizationMode] = useState(false);

  const handleSubmit = (input: PredictionInput) => {
    setLoading(true);
    setResult(null);
    setLastInput(input);
    setTimeout(() => {
      const res = predict(input);
      saveToHistory(input, res);
      setResult(res);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Report Header */}
        {result && (
          <div className="animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
                  <FileText className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold text-foreground">
                    Digital Sustainability Intelligence Report
                  </h1>
                  <p className="text-sm text-muted-foreground font-body">
                    Generated {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>
              {/* Optimization Mode Toggle */}
              <div className="flex items-center gap-3 bg-card rounded-lg shadow-card px-4 py-2.5">
                <Leaf className="w-4 h-4 text-primary" />
                <span className="text-sm font-body font-medium text-foreground">Optimization Mode</span>
                <Switch checked={optimizationMode} onCheckedChange={setOptimizationMode} />
              </div>
            </div>
          </div>
        )}

        <PredictionForm onSubmit={handleSubmit} loading={loading} />

        {result && lastInput && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Benchmark badges + cards */}
            <BenchmarkPanel predictedEmission={result.predicted_carbon_emission} monthlyUsers={lastInput.monthly_users} />

            {/* Core results */}
            <ResultsDisplay result={result} />

            {/* Optimization Simulator */}
            {optimizationMode && (
              <OptimizationPanel originalInput={lastInput} originalResult={result} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
