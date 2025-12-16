import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { performanceMetrics } from "@/data/tradingData";

export const PerformanceChart = () => {
  // Use Q4/2025 simulation data - showing monthly progression
  const simulationData = [
    { month: "Oct '25", balance: performanceMetrics.initialBalance, label: "Starting Balance" },
    { month: "Nov '25", balance: performanceMetrics.balance, label: "End of Simulation" },
    { month: "Dec '25", balance: performanceMetrics.balance, label: "Current" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="p-6 bg-card border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">Cumulative Performance</h3>
          <div className="flex items-center gap-4 mt-2 md:mt-0 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Initial:</span>
              <span className="font-semibold text-foreground">${performanceMetrics.initialBalance.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Final:</span>
              <span className="font-semibold text-success">${performanceMetrics.balance.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Profit:</span>
              <span className="font-semibold text-success">+${performanceMetrics.totalNetProfit.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={simulationData}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              domain={[9000, 15000]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Balance']}
            />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              fill="url(#colorBalance)" 
            />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Q4/2025 Performance Simulation • Total Return: {performanceMetrics.roi}%
        </p>
      </Card>
    </motion.div>
  );
};
