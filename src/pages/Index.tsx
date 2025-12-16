import { motion } from "framer-motion";
import {
  AlertCircle,
  DollarSign,
  TrendingUp,
  Target,
  Activity,
  BarChart3,
  Lock,
  LineChart,
  Gauge,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MetricCard } from "@/components/TradingDashboard/MetricCard";
import { PerformanceChart } from "@/components/TradingDashboard/PerformanceChart";
import { ROIChart } from "@/components/TradingDashboard/ROIChart";
import { TradeDistribution } from "@/components/TradingDashboard/TradeDistribution";
import { TradeHistory } from "@/components/TradingDashboard/TradeHistory";
import { RiskMetricsGauge } from "@/components/TradingDashboard/RiskMetricsGauge";
import { BenchmarkComparison } from "@/components/TradingDashboard/BenchmarkComparison";
import { InsightsTips } from "@/components/TradingDashboard/InsightsTips";
import { performanceMetrics, tradeStatistics } from "@/data/tradingData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  // Recipient — change here when needed
  const recipient = "Mr. Farouk Bernaoui";

  // Client share configuration
  const clientSharePercent = 0.6; // 60%
  // Use totalNetProfit as the base profit amount (3,653.79 in your example)
  const rawProfit = Number(performanceMetrics.totalNetProfit) || 0;

  // compute take-home
  const clientTakeHome = +(rawProfit * clientSharePercent);
  // formatted strings
  const fmtMoney = (n: number) =>
    n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const rawProfitFormatted = fmtMoney(rawProfit);
  const takeHomeFormatted = fmtMoney(clientTakeHome);
  const percentText = `${Math.round(clientSharePercent * 100)}%`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Title */}
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-foreground">Blue Marvel Capital</h1>
              <p className="text-sm text-muted-foreground">Performance Simulation Report</p>
            </div>

            {/* Proprietary Badge */}
            <div className="flex items-center justify-center md:justify-end gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/30">
              <Lock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Proprietary Data</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Warning Alert */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Alert className="bg-warning/10 border-warning/50">
            <AlertCircle className="h-4 w-4 text-warning" />
            <AlertDescription className="text-warning-foreground text-white">
              <strong>Confidential:</strong> This trading data is proprietary information of
              Blue Marvel Capital. Prepared exclusively for{" "}
              <span className="font-bold text-white">{recipient}</span>. Unauthorized distribution or reproduction
              is prohibited.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Big Personal Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary">Prepared For: {recipient}</h2>
          <p className="text-muted-foreground mt-2">Personalized Performance Simulation Report — Q4/2025</p>
        </div>

        {/* Capital Overview + Recipient Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Initial Capital"
              value={`$${performanceMetrics.initialBalance.toLocaleString()}`}
              subtitle="Starting Investment"
              icon={DollarSign}
              trend="neutral"
              tooltip="Initial capital allocated for this performance simulation."
              delay={0}
            />
            <MetricCard
              title="Current Balance"
              value={`$${performanceMetrics.balance.toLocaleString()}`}
              subtitle={`+$${performanceMetrics.totalNetProfit.toLocaleString()} profit`}
              icon={DollarSign}
              trend="up"
              tooltip="Current portfolio value after all trades."
              delay={0.1}
            />
            <MetricCard
              title="Total Return"
              value={`${performanceMetrics.roi}%`}
              subtitle="Portfolio Performance"
              icon={TrendingUp}
              trend="up"
              tooltip="Total percentage return on initial capital."
              delay={0.2}
            />
          </div>

          {/* Client Take-Home Summary - Professional animated card */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-xl h-full">
              {/* Animated background accent */}
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <CardContent className="p-5 relative z-10">
                {/* Header with badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Client Summary
                  </span>
                  <Badge className="bg-primary text-primary-foreground shadow-sm">
                    {percentText} Share
                  </Badge>
                </div>

                {/* Client name */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-sm text-muted-foreground">Prepared for</p>
                  <h3 className="text-lg font-bold text-foreground mt-0.5">{recipient}</h3>
                </motion.div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-4" />

                {/* Total Profit */}
                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-xs text-muted-foreground mb-1">Total Profit Generated</p>
                  <p className="text-2xl font-bold text-foreground">${rawProfitFormatted}</p>
                </motion.div>

                {/* Client Take-Home - Highlighted */}
                <motion.div
                  className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-green-700 dark:text-green-400 uppercase tracking-wide">
                        Your Take-Home
                      </p>
                      <motion.p
                        className="text-3xl font-extrabold text-green-600 dark:text-green-400 mt-1"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                      >
                        ${takeHomeFormatted}
                      </motion.p>
                    </div>
                    <motion.div
                      className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </motion.div>
                  </div>

                  {/* Formula */}
                  <div className="mt-3 pt-3 border-t border-green-500/20">
                    <p className="text-xs text-muted-foreground font-mono">
                      ${rawProfitFormatted} × {percentText} = ${takeHomeFormatted}
                    </p>
                  </div>
                </motion.div>

                {/* Footer */}
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Performance Period: Q4/2025
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Key Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Net Profit"
            value={`$${performanceMetrics.totalNetProfit.toLocaleString()}`}
            subtitle="Q4/2025"
            icon={DollarSign}
            trend="up"
            tooltip="Total profit after all commissions and fees for Q4/2025."
            delay={0.3}
          />
          <MetricCard
            title="Sharpe Ratio"
            value={performanceMetrics.sharpeRatioAnnualized.toFixed(2)}
            subtitle="Annualized (Monthly: 0.58)"
            icon={Gauge}
            trend="up"
            tooltip="Risk-adjusted return measure. Above 2.0 is considered excellent. Calculated against 4% US T-Bill risk-free rate."
            delay={0.4}
          />
          <MetricCard
            title="Alpha"
            value={`${performanceMetrics.alpha}%`}
            subtitle="Q4 2025 Excess Performance"
            icon={LineChart}
            trend="up"
            tooltip="Alpha measures outperformance relative to benchmark. 33% alpha indicates exceptional active management."
            delay={0.5}
          />
          <MetricCard
            title="Win Rate"
            value={`${tradeStatistics.profitTradesPercent}%`}
            subtitle={`${tradeStatistics.profitTrades} of ${tradeStatistics.totalTrades} trades`}
            icon={Target}
            trend="up"
            tooltip="Percentage of profitable trades. Industry average is 40-60%. 80.65% is exceptional."
            delay={0.6}
          />
        </div>

        {/* Performance Chart */}
        <div className="mb-8">
          <PerformanceChart />
        </div>

        {/* ROI Chart */}
        <div className="mb-8">
          <ROIChart />
        </div>

        {/* Trade Distribution Charts */}
        <div className="mb-8">
          <TradeDistribution />
        </div>

        {/* Risk Metrics Gauge */}
        <div className="mb-8">
          <RiskMetricsGauge />
        </div>

        {/* Benchmark Comparison */}
        <div className="mb-8">
          <BenchmarkComparison />
        </div>

        {/* Risk & Trading Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Profit Factor"
            value={performanceMetrics.profitFactor.toFixed(2)}
            subtitle="Risk-Reward Ratio"
            icon={Activity}
            trend="up"
            tooltip="Ratio of gross profit to gross loss. Above 2.0 is excellent. 4.40 is outstanding."
            delay={0.4}
          />
          <MetricCard
            title="Std Deviation"
            value={`${performanceMetrics.standardDeviation.toFixed(2)}%`}
            subtitle="Portfolio Volatility"
            icon={BarChart3}
            trend="neutral"
            tooltip="Standard deviation of returns (14.39%). Lower volatility with high returns indicates efficient risk management."
            delay={0.5}
          />
          <MetricCard
            title="Avg Loss"
            value={`$${Math.abs(tradeStatistics.averageLossTrade).toFixed(2)}`}
            subtitle="Per losing trade"
            icon={Activity}
            trend="down"
            tooltip="Average loss on losing trades. Smaller losses indicate good risk management."
            delay={0.6}
          />
          <MetricCard
            title="Risk-Free Rate"
            value={`${performanceMetrics.riskFreeRate}%`}
            subtitle="US T-Bill (3 Month)"
            icon={BarChart3}
            trend="neutral"
            tooltip="Baseline risk-free rate used for Sharpe ratio calculation."
            delay={0.7}
          />
        </div>

        {/* Additional Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="High-Water Mark"
            value={`$${performanceMetrics.highWaterMark.toLocaleString()}`}
            subtitle="Peak Portfolio Value"
            icon={TrendingUp}
            trend="up"
            tooltip="The highest portfolio value achieved during the simulation period."
            delay={0.8}
          />
          <MetricCard
            title="Hurdle Rate"
            value={`${performanceMetrics.hurdleRate}%`}
            subtitle="Minimum Target Return"
            icon={Target}
            trend="neutral"
            tooltip="The minimum return threshold that must be exceeded before performance fees apply."
            delay={0.9}
          />
          <MetricCard
            title="Avg Win"
            value={`$${tradeStatistics.averageProfitTrade.toFixed(2)}`}
            subtitle="Per profitable trade"
            icon={TrendingUp}
            trend="up"
            tooltip="Average profit on winning trades. Higher values indicate strong profit-taking."
            delay={1.0}
          />
          <MetricCard
            title="Total Trades"
            value={tradeStatistics.totalTrades}
            subtitle="Q4/2025 Activity"
            icon={BarChart3}
            trend="neutral"
            tooltip="Total number of closed positions for the period."
            delay={1.1}
          />
        </div>

        {/* Insights & Tips */}
        <div className="mb-8">
          <InsightsTips />
        </div>

        {/* Trade History Table */}
        <TradeHistory />
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Blue Marvel Capital. All rights reserved.</p>
          <p className="mt-2">Performance Simulation — Prepared for {recipient}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
