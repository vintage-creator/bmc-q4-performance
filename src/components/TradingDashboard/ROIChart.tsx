import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { trades } from "@/data/tradingData";

export const ROIChart = () => {
  const initialBalance = 10000;
  
  const roiData = trades
    .sort((a, b) => new Date(a.closeTime).getTime() - new Date(b.closeTime).getTime())
    .reduce((acc, trade, index) => {
      const prevBalance = index === 0 ? initialBalance : acc[index - 1].balance;
      const newBalance = prevBalance + trade.profit;
      const roi = ((newBalance - initialBalance) / initialBalance) * 100;
      
      acc.push({
        date: new Date(trade.closeTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        roi: parseFloat(roi.toFixed(2)),
        balance: newBalance,
        trade: index + 1,
      });
      return acc;
    }, [] as Array<{ date: string; roi: number; balance: number; trade: number }>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-bold text-foreground mb-6">ROI Progression</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={roiData}>
            <defs>
              <linearGradient id="colorROI" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${value.toFixed(0)}%`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
              formatter={(value: number, name: string) => {
                if (name === 'roi') return [`${value.toFixed(2)}%`, 'ROI'];
                return [value, name];
              }}
            />
            <Line 
              type="monotone" 
              dataKey="roi" 
              stroke="hsl(var(--success))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </motion.div>
  );
};