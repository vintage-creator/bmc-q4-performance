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
  const recipient = "Mr. Farouk Bernaoui";

  const clientSharePercent = 0.6;
  const rawProfit = Number(performanceMetrics.totalNetProfit) || 0;

  const clientTakeHome = rawProfit * clientSharePercent;

  const fmtMoney = (n: number) =>
    n.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const rawProfitFormatted = fmtMoney(rawProfit);
  const takeHomeFormatted = fmtMoney(clientTakeHome);
  const percentText = `${Math.round(clientSharePercent * 100)}%`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">Blue Marvel Capital</h1>
            <p className="text-sm text-muted-foreground">
              Performance Simulation Report
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/30">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Proprietary Data
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Alert */}
        <Alert className="mb-6 bg-warning/10 border-warning/50">
          <AlertCircle className="h-4 w-4 text-warning" />
          <AlertDescription className="text-white">
            <strong>Confidential:</strong> This trading data is proprietary information of Blue Marvel Capital. Prepared exclusively for{" "}
            <span className="font-bold">{recipient}</span>. Unauthorized distribution or reproduction is prohibited.
          </AlertDescription>
        </Alert>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary">
            Prepared For: {recipient}
          </h2>
          <p className="text-muted-foreground mt-2">
            Personalized Performance Simulation Report — Q4/2025
          </p>
        </div>

        {/* Capital Overview - Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <MetricCard
            title="Initial Capital"
            value={`$${performanceMetrics.initialBalance.toLocaleString()}`}
            subtitle="Starting Investment"
            icon={DollarSign}
            trend="neutral"
          />
          <MetricCard
            title="Current Balance"
            value={`$${performanceMetrics.balance.toLocaleString()}`}
            subtitle={`+$${performanceMetrics.totalNetProfit.toLocaleString()} profit`}
            icon={DollarSign}
            trend="up"
          />
          <MetricCard
            title="Total Return"
            value={`${performanceMetrics.roi}%`}
            subtitle="Portfolio Performance"
            icon={TrendingUp}
            trend="up"
          />
        </div>

        {/* Client Summary - Centered */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="w-full max-w-3xl"
          >
            <Card className="relative border-2 border-primary/30 shadow-2xl bg-gradient-to-br from-card via-card to-primary/10">
              {/* Header with Badge */}
              <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent px-6 py-4 border-b border-primary/20">
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Target className="w-5 h-5 text-primary" />
                  </motion.div>
                  <span className="text-sm font-bold uppercase tracking-widest text-primary">
                    Client Summary
                  </span>
                  <Badge variant="secondary" className="ml-2">{percentText} Share</Badge>
                </div>
              </div>

              <CardContent className="p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  {/* Client Info */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center lg:text-left"
                  >
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Prepared for</p>
                    <h3 className="text-xl font-bold text-foreground">{recipient}</h3>
                    <p className="text-xs text-muted-foreground mt-2">Q4/2025 Performance Report</p>
                  </motion.div>

                  {/* Take Home - Center Focus */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-1"
                  >
                    <div className="rounded-2xl border-2 border-green-500/40 bg-gradient-to-br from-green-500/15 via-emerald-500/10 to-green-600/5 p-6 text-center shadow-lg shadow-green-500/10">
                      <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-3">
                        Your Take-Home
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.15, 1],
                            boxShadow: [
                              "0 0 0 0 rgba(34, 197, 94, 0.4)",
                              "0 0 0 10px rgba(34, 197, 94, 0)",
                              "0 0 0 0 rgba(34, 197, 94, 0)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-12 h-12 rounded-full bg-green-500/25 flex items-center justify-center shrink-0"
                        >
                          <DollarSign className="w-6 h-6 text-green-500" />
                        </motion.div>
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                          className="text-3xl sm:text-4xl font-black text-green-500"
                        >
                          ${takeHomeFormatted}
                        </motion.p>
                      </div>
                      <p className="mt-4 text-xs text-muted-foreground font-mono bg-background/50 rounded-lg py-2 px-3 inline-block">
                        ${rawProfitFormatted} × {percentText} = ${takeHomeFormatted}
                      </p>
                    </div>
                  </motion.div>

                  {/* Total Profit */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center lg:text-right"
                  >
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Total Profit Generated</p>
                    <p className="text-2xl font-bold text-foreground">${rawProfitFormatted}</p>
                    <div className="flex items-center justify-center lg:justify-end gap-2 mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500 font-medium">+{performanceMetrics.roi}%</span>
                    </div>
                  </motion.div>
                </div>
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
