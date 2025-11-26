import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { trades, Trade } from "@/data/tradingData";

interface ROIDataPoint {
  date: string;
  roi: number;
  balance: number;
  trade: number;
  tradeDetails: Trade;
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ROIDataPoint;
    const trade = data.tradeDetails;
    const isProfit = trade.profit > 0;
    
    return (
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
        <p className="text-sm font-semibold text-foreground mb-2">
          Trade #{data.trade} - {trade.item.toUpperCase()}
        </p>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Type:</span>
            <span className={`font-medium ${trade.type === 'buy' ? 'text-success' : 'text-primary'}`}>
              {trade.type.toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Size:</span>
            <span className="text-foreground font-medium">{trade.size}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Open:</span>
            <span className="text-foreground">{trade.openPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Close:</span>
            <span className="text-foreground">{trade.closePrice.toLocaleString()}</span>
          </div>
          <div className="border-t border-border pt-1.5 mt-1.5">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Profit/Loss:</span>
              <span className={`font-semibold ${isProfit ? 'text-success' : 'text-destructive'}`}>
                ${trade.profit.toFixed(2)}
              </span>
            </div>
            {trade.commission !== 0 && (
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Commission:</span>
                <span className="text-muted-foreground">${trade.commission.toFixed(2)}</span>
              </div>
            )}
          </div>
          <div className="border-t border-border pt-1.5 mt-1.5">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Balance:</span>
              <span className="text-foreground font-medium">${data.balance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground font-semibold">ROI:</span>
              <span className="text-success font-bold text-base">{data.roi.toFixed(2)}%</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
          {data.date}
        </p>
      </div>
    );
  }
  
  return null;
};

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
        tradeDetails: trade,
      });
      return acc;
    }, [] as ROIDataPoint[]);

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
            <Tooltip content={<CustomTooltip />} />
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