import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { performanceMetrics } from "@/data/tradingData";

/**
 * PerformanceChart
 * - Responsive Recharts AreaChart wrapped in a parent with explicit height.
 * - Uses ResizeObserver to ensure the chart only mounts when parent dimensions are measurable.
 * - Tailwind classes used for layout and responsive height.
 */

export const PerformanceChart: React.FC = () => {
  // Example simulation data (Q4/2025)
  const simulationData = [
    { month: "Oct '25", balance: performanceMetrics.initialBalance, label: "Starting Balance" },
    { month: "Nov '25", balance: performanceMetrics.balance, label: "End of Simulation" },
    { month: "Dec '25", balance: performanceMetrics.balance, label: "Current" },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize width if already visible
    setContainerWidth(containerRef.current.offsetWidth || 0);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        setContainerWidth(w);
      }
    });

    ro.observe(containerRef.current);

    return () => ro.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
    >
      {/* Card uses full width so the chart can expand/shrink */}
      <Card className="p-6 bg-card border-border w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">Cumulative Performance</h3>

          <div className="flex items-center gap-4 mt-3 md:mt-0 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Initial:</span>
              <span className="font-semibold text-foreground">
                ${performanceMetrics.initialBalance.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Final:</span>
              <span className="font-semibold text-success">
                ${performanceMetrics.balance.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Profit:</span>
              <span className="font-semibold text-success">
                +${performanceMetrics.totalNetProfit.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* IMPORTANT: give the parent a definite height (responsive) */}
        <div
          ref={containerRef}
          className="w-full h-[280px] md:h-[350px] relative"
          aria-hidden={false}
        >
          {containerWidth > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={simulationData}
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                role="img"
                aria-label="Cumulative performance over time"
              >
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.22} />

                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: 12 }}
                  interval={0} // ok for small number of points
                  tick={{ dy: 6 }}
                  padding={{ left: 8, right: 8 }}
                />

                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: 12 }}
                  tickFormatter={(value: number) => `$${value.toLocaleString()}`}
                  domain={[9000, 15000]}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    color: "hsl(var(--foreground))",
                    fontSize: 13,
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Balance"]}
                />

                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  fill="url(#colorBalance)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            // Fallback skeleton while container size is 0 (e.g. hidden tab, server mount)
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse w-3/4 h-3/4 rounded-md bg-muted-foreground/10" />
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Q4/2025 Performance Simulation • Total Return: {performanceMetrics.roi}%
        </p>
      </Card>
    </motion.div>
  );
};

export default PerformanceChart;
