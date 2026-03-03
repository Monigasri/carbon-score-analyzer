import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getHistory, deleteFromHistory, clearHistory, type HistoryEntry } from "@/lib/history";
import { Clock, Trash2, ArrowRight, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";

const History = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setEntries(getHistory());
  }, []);

  const handleDelete = (id: string) => {
    deleteFromHistory(id);
    setEntries(getHistory());
  };

  const handleClearAll = () => {
    clearHistory();
    setEntries([]);
  };

  const getScoreColor = (score: number) => {
    if (score >= 60) return "text-primary";
    if (score >= 30) return "text-chart-warning";
    return "text-destructive";
  };

  const getScoreBg = (score: number) => {
    if (score >= 60) return "bg-primary/10";
    if (score >= 30) return "bg-chart-warning/10";
    return "bg-destructive/10";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Prediction History</h1>
            <p className="text-muted-foreground font-body text-sm mt-1">
              {entries.length} analysis{entries.length !== 1 ? "es" : ""} saved locally
            </p>
          </div>
          {entries.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-sm text-destructive hover:text-destructive/80 font-body flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-destructive/5 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <Clock className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">No predictions yet</h3>
            <p className="text-muted-foreground font-body mb-6">Run your first carbon analysis to see it here.</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="gradient-hero text-primary-foreground font-display font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Start Analysis →
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry, i) => (
              <div
                key={entry.id}
                className="bg-card rounded-xl shadow-card p-5 hover:shadow-card-hover transition-all duration-200 animate-fade-in-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold font-display ${getScoreBg(entry.result.green_score)} ${getScoreColor(entry.result.green_score)}`}>
                        Score: {entry.result.green_score}/100
                      </span>
                      <span className="text-xs text-muted-foreground font-body">
                        {new Date(entry.timestamp).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-xs font-body">
                      <div>
                        <span className="text-muted-foreground">Page</span>
                        <p className="font-medium text-foreground">{entry.input.page_size} MB</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">APIs</span>
                        <p className="font-medium text-foreground">{entry.input.api_calls}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Images</span>
                        <p className="font-medium text-foreground">{entry.input.images}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Users</span>
                        <p className="font-medium text-foreground">{entry.input.monthly_users.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Session</span>
                        <p className="font-medium text-foreground">{entry.input.session_time} min</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Response</span>
                        <p className="font-medium text-foreground">{entry.input.server_response_time} ms</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm font-body">
                      <span className="text-foreground font-medium">{entry.result.predicted_carbon_emission} kg CO₂</span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground">{entry.result.energy_usage_kwh} kWh</span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground">{entry.result.rating}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default History;
