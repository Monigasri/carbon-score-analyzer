import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  data: { feature: string; importance: number }[];
}

const ImportanceChart = ({ data }: Props) => (
  <div className="bg-card rounded-xl shadow-card p-6">
    <h3 className="font-display font-semibold text-foreground mb-4">Feature Importance</h3>
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
        <YAxis
          dataKey="feature"
          type="category"
          width={130}
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
        />
        <Tooltip
          contentStyle={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "13px",
          }}
        />
        <Bar
          dataKey="importance"
          fill="hsl(var(--chart-accent))"
          radius={[0, 6, 6, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default ImportanceChart;
