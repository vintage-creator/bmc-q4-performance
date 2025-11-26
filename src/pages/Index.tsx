import { motion } from "framer-motion";
import {
  AlertCircle,
  DollarSign,
  TrendingUp,
  Target,
  Activity,
  BarChart3,
  Lock,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MetricCard } from "@/components/TradingDashboard/MetricCard";
import { PerformanceChart } from "@/components/TradingDashboard/PerformanceChart";
import { ROIChart } from "@/components/TradingDashboard/ROIChart";
import { TradeDistribution } from "@/components/TradingDashboard/TradeDistribution";
import { TradeHistory } from "@/components/TradingDashboard/TradeHistory";
import { InsightsTips } from "@/components/TradingDashboard/InsightsTips";
import { performanceMetrics, tradeStatistics } from "@/data/tradingData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Title */}
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-foreground">
                Blue Marvel Capital Strategies
              </h1>
              <p className="text-sm text-muted-foreground">
                Apollo I - Account 3591540
              </p>
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
          className="mb-8"
        >
          <Alert className="bg-warning/10 border-warning/50">
            <AlertCircle className="h-4 w-4 text-warning" />
            <AlertDescription className="text-warning-foreground text-white">
              <strong>Confidential:</strong> This trading data is proprietary
              information of Blue Marvel Capital Strategies. Unauthorized
              distribution or reproduction is prohibited. For official site:
              <a
                href="https://bmc-trading-floor-user-web-kszq.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline ml-1 hover:text-warning"
              >
                bmc-trading-floor-user-web-kszq.vercel.app
              </a>
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Net Profit"
            value={`$${performanceMetrics.totalNetProfit.toLocaleString()}`}
            subtitle="Q4 2025 Performance"
            icon={DollarSign}
            trend="up"
            tooltip="Total profit after all commissions and fees. This represents the net gain for the quarter."
            delay={0}
          />
          <MetricCard
            title="ROI"
            value={`${performanceMetrics.roi.toFixed(2)}%`}
            subtitle="Return on Investment"
            icon={TrendingUp}
            trend="up"
            tooltip="Return on Investment: percentage gain on initial capital. A strong ROI indicates efficient capital deployment."
            delay={0.1}
          />
          <MetricCard
            title="Win Rate"
            value={`${tradeStatistics.profitTradesPercent}%`}
            subtitle={`${tradeStatistics.profitTrades} of ${tradeStatistics.totalTrades} trades`}
            icon={Target}
            trend="up"
            tooltip="Percentage of profitable trades. Industry average is typically 40-60%. Your 80.65% is exceptional."
            delay={0.2}
          />
          <MetricCard
            title="Profit Factor"
            value={performanceMetrics.profitFactor}
            subtitle="Risk-Reward Ratio"
            icon={Activity}
            trend="up"
            tooltip="Ratio of gross profit to gross loss. A profit factor above 2.0 is considered excellent. Your 4.40 is outstanding."
            delay={0.3}
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

        {/* Additional Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Current Balance"
            value={`$${performanceMetrics.balance.toLocaleString()}`}
            subtitle="Account equity"
            icon={DollarSign}
            trend="neutral"
            tooltip="Total account value including closed positions."
            delay={0.4}
          />
          <MetricCard
            title="Avg Win"
            value={`$${tradeStatistics.averageProfitTrade.toFixed(2)}`}
            subtitle="Per profitable trade"
            icon={TrendingUp}
            trend="up"
            tooltip="Average profit on winning trades. Higher values indicate strong profit-taking strategy."
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
            title="Total Trades"
            value={tradeStatistics.totalTrades}
            subtitle="Q4 2025 Activity"
            icon={BarChart3}
            trend="neutral"
            tooltip="Total number of closed positions for the period."
            delay={0.7}
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
          <p>© 2025 Blue Marvel Capital Strategies. All rights reserved.</p>
          <p className="mt-2">Data as of Q4 2025 - Statement ID: 3591540</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
