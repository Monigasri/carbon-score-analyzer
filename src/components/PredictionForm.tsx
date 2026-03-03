import { useState } from "react";
import type { PredictionInput } from "@/lib/predictions";
import { Loader2 } from "lucide-react";

interface Props {
  onSubmit: (input: PredictionInput) => void;
  loading: boolean;
}

const FIELDS: { key: keyof PredictionInput; label: string; placeholder: string; unit: string }[] = [
  { key: "page_size", label: "Page Size", placeholder: "2.5", unit: "MB" },
  { key: "api_calls", label: "API Calls", placeholder: "50", unit: "per session" },
  { key: "images", label: "Images", placeholder: "15", unit: "count" },
  { key: "monthly_users", label: "Monthly Users", placeholder: "10000", unit: "users" },
  { key: "session_time", label: "Session Time", placeholder: "5", unit: "minutes" },
  { key: "server_response_time", label: "Server Response Time", placeholder: "200", unit: "ms" },
];

const PredictionForm = ({ onSubmit, loading }: Props) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const input: Record<string, number> = {};
    for (const field of FIELDS) {
      const val = parseFloat(values[field.key] || "");
      if (isNaN(val) || val < 0) {
        setError(`Please enter a valid positive number for ${field.label}`);
        return;
      }
      input[field.key] = val;
    }
    onSubmit(input as unknown as PredictionInput);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-card p-8">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        Enter Your App Metrics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {FIELDS.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-foreground mb-1.5 font-body">
              {field.label}
              <span className="text-muted-foreground ml-1 font-normal">({field.unit})</span>
            </label>
            <input
              type="number"
              step="any"
              min="0"
              placeholder={field.placeholder}
              value={values[field.key] || ""}
              onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-4 text-sm text-destructive font-body">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full gradient-hero text-primary-foreground font-display font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          "Predict Carbon Emission"
        )}
      </button>
    </form>
  );
};

export default PredictionForm;
