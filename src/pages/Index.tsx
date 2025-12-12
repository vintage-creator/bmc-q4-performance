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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Title */}
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-foreground">
                Blue Marvel Capital
              </h1>
              <p className="text-sm text-muted-foreground">
                Performance Simulation Prepared for {recipient}
              </p>

              {/* Prominent "Prepared for" */}
              <div className="mt-3">
                <div className="text-sm text-muted-foreground">Prepared for</div>
                <div className="mt-1 text-2xl md:text-3xl font-extrabold text-primary tracking-tight">
                  {recipient}
                </div>
              </div>
            </div>

            {/* Proprietary Badge */}
            <div className="flex items-center justify-center md:justify-end gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/30">
              <Lock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Proprietary Data
              </span>
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
              <strong>Confidential:</strong> This trading data is proprietary
              information of Blue Marvel Capital. Prepared exclusively for{" "}
              <span className="font-bold text-lg text-white">{recipient}</span>.
              Unauthorized distribution or reproduction is prohibited.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Big Personal Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary">
            Prepared For: {recipient}
          </h2>
          <p className="text-muted-foreground mt-2">
            Personalized Performance Simulation Report — November 2025
          </p>
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

          {/* Recipient Summary — large amount + name */}
          <div className="md:col-span-1">
            <Card className="border border-border/50 bg-white/95 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Prepared for</div>

                    {/* Big amount (same scale as MetricCard money) */}
                    <div className="mt-2 text-2xl md:text-3xl font-extrabold text-foreground">
                      ${performanceMetrics.initialBalance.toLocaleString()}
                    </div>

                    {/* Prominent name in same visual weight */}
                    <div className="mt-1 text-lg md:text-xl font-semibold text-primary">
                      {recipient}
                    </div>

                    <div className="mt-2 text-xs text-muted-foreground">As of November 2025</div>
                  </div>
                  <div className="ml-4 shrink-0">
                    <Badge className="bg-primary/10 text-primary border-primary/30">Client</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Net Profit"
            value={`$${performanceMetrics.totalNetProfit.toLocaleString()}`}
            subtitle="November 2025"
            icon={DollarSign}
            trend="up"
            tooltip="Total profit after all commissions and fees for November 2025."
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
            title="Excess Return"
            value={`${performanceMetrics.excessReturn}%`}
            subtitle={`Avg: ${performanceMetrics.averageExcessReturn}%`}
            icon={TrendingUp}
            trend="up"
            tooltip="Return above risk-free rate (4% US T-Bill). 25% excess return demonstrates strong performance."
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
            title="Excess Return"
            value={`${performanceMetrics.excessReturn}%`}
            subtitle={`Avg: ${performanceMetrics.averageExcessReturn}%`}
            icon={TrendingUp}
            trend="up"
            tooltip="Return above risk-free rate (4% US T-Bill). 25% excess return demonstrates strong performance."
            delay={0.8}
          />
          <MetricCard
            title="Avg Win"
            value={`$${tradeStatistics.averageProfitTrade.toFixed(2)}`}
            subtitle="Per profitable trade"
            icon={TrendingUp}
            trend="up"
            tooltip="Average profit on winning trades. Higher values indicate strong profit-taking."
            delay={0.9}
          />
          <MetricCard
            title="Avg Loss"
            value={`$${Math.abs(tradeStatistics.averageLossTrade).toFixed(2)}`}
            subtitle="Per losing trade"
            icon={Activity}
            trend="down"
            tooltip="Average loss on losing trades. Smaller losses indicate good risk management."
            delay={1.0}
          />
          <MetricCard
            title="Total Trades"
            value={tradeStatistics.totalTrades}
            subtitle="Q4 2025 Activity"
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
