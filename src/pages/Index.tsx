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
import { performanceMetrics, trades } from "@/data/tradingData";
import { Card, CardContent } from "@/components/ui/card";

const initialBalance = 10000;

const tradeSummary = trades.reduce(
  (acc, trade) => {
    const net = trade.profit + trade.commission;

    acc.totalTrades += 1;
    acc.grossProfit += trade.profit > 0 ? trade.profit : 0;
    acc.grossLoss += trade.profit < 0 ? Math.abs(trade.profit) : 0;
    acc.totalCommissions += Math.abs(trade.commission);
    acc.totalNetProfit += net;

    if (net > 0) {
      acc.profitTrades += 1;
      acc.winningNetTrades.push(net);
    } else if (net < 0) {
      acc.lossTrades += 1;
      acc.losingNetTrades.push(net);
    }

    if (trade.type === "sell") {
      acc.shortPositions += 1;
      if (net > 0) acc.shortWins += 1;
    } else {
      acc.longPositions += 1;
      if (net > 0) acc.longWins += 1;
    }

    return acc;
  },
  {
    totalTrades: 0,
    grossProfit: 0,
    grossLoss: 0,
    totalCommissions: 0,
    totalNetProfit: 0,
    profitTrades: 0,
    lossTrades: 0,
    shortPositions: 0,
    shortWins: 0,
    longPositions: 0,
    longWins: 0,
    winningNetTrades: [] as number[],
    losingNetTrades: [] as number[],
  }
);

const grossProfit = tradeSummary.grossProfit;
const grossLoss = tradeSummary.grossLoss;
const totalCommissions = tradeSummary.totalCommissions;
const totalNetProfit = tradeSummary.totalNetProfit;
const balance = initialBalance + totalNetProfit;
const roi = (totalNetProfit / initialBalance) * 100;
const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : 0;
const expectedPayoff = tradeSummary.totalTrades
  ? totalNetProfit / tradeSummary.totalTrades
  : 0;

const profitTradesPercent = tradeSummary.totalTrades
  ? (tradeSummary.profitTrades / tradeSummary.totalTrades) * 100
  : 0;

const averageProfitTrade = tradeSummary.winningNetTrades.length
  ? tradeSummary.winningNetTrades.reduce((sum, value) => sum + value, 0) /
    tradeSummary.winningNetTrades.length
  : 0;

const averageLossTrade = tradeSummary.losingNetTrades.length
  ? tradeSummary.losingNetTrades.reduce((sum, value) => sum + value, 0) /
    tradeSummary.losingNetTrades.length
  : 0;

const Index = () => {
  const fmtMoney = (value: number) =>
    value.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const goTo2026 = () => {
    window.location.href = "https://bmc-overall-trading-data.vercel.app";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-4 md:flex-row">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">Blue Marvel Capital</h1>
            <p className="text-sm text-muted-foreground">
              Performance simulation report
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-1 shadow-sm">
              <button
                type="button"
                className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow-sm"
                aria-current="page"
              >
                2025
              </button>
              <button
                type="button"
                onClick={goTo2026}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                2026
              </button>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2">
              <Lock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Proprietary data
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Alert className="mb-6 border-warning/50 bg-warning/10">
          <AlertCircle className="h-4 w-4 text-warning" />
          <AlertDescription>
            <strong>Confidential:</strong> This trading data is proprietary
            information of Blue Marvel Capital. Unauthorised distribution or
            reproduction is prohibited.
          </AlertDescription>
        </Alert>

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl md:text-5xl">
            Performance report
          </h2>
          <p className="mt-2 text-muted-foreground">
            Q4 2025 trading performance summary
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="Initial capital"
            value={`$${fmtMoney(initialBalance)}`}
            subtitle="Starting balance"
            icon={DollarSign}
            trend="neutral"
          />
          <MetricCard
            title="Current balance"
            value={`$${fmtMoney(balance)}`}
            subtitle={`+$${fmtMoney(totalNetProfit)} net profit`}
            icon={DollarSign}
            trend="up"
          />
          <MetricCard
            title="Total return"
            value={`${roi.toFixed(2)}%`}
            subtitle="Portfolio performance"
            icon={TrendingUp}
            trend="up"
          />
        </div>

        <div className="mb-8 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="w-full max-w-4xl"
          >
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/10 shadow-2xl">
              <div className="border-b border-primary/20 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent px-6 py-4">
                <div className="flex items-center justify-center gap-3">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="text-sm font-bold uppercase tracking-widest text-primary">
                    Performance overview
                  </span>
                </div>
              </div>

              <CardContent className="p-6 sm:p-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                  <div className="rounded-2xl border border-border bg-background/50 p-4 text-center">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Gross profit
                    </p>
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      ${fmtMoney(grossProfit)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/50 p-4 text-center">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Gross loss
                    </p>
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      ${fmtMoney(grossLoss)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/50 p-4 text-center">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Commissions
                    </p>
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      ${fmtMoney(totalCommissions)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wide text-green-500">
                      Net profit
                    </p>
                    <p className="mt-2 text-2xl font-extrabold text-green-600">
                      ${fmtMoney(totalNetProfit)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-border bg-background/60 px-4 py-3 text-center text-sm text-muted-foreground">
                  Net profit is calculated from profit plus commission across all
                  closed trades.
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total net profit"
            value={`$${fmtMoney(totalNetProfit)}`}
            subtitle="Calculated from trades"
            icon={DollarSign}
            trend="up"
            tooltip="Net profit after commissions across all closed trades."
            delay={0.3}
          />
          <MetricCard
            title="Profit factor"
            value={profitFactor.toFixed(2)}
            subtitle="Gross profit ÷ gross loss"
            icon={Activity}
            trend="up"
            tooltip="Ratio of gross profit to gross loss. A value above 2.0 is generally strong."
            delay={0.4}
          />
          <MetricCard
            title="Sharpe ratio"
            value={performanceMetrics.sharpeRatioAnnualized.toFixed(2)}
            subtitle="Annualised (monthly: 0.58)"
            icon={Gauge}
            trend="up"
            tooltip="Risk-adjusted return measure based on the supplied performance data."
            delay={0.5}
          />
          <MetricCard
            title="Win rate"
            value={`${profitTradesPercent.toFixed(2)}%`}
            subtitle={`${tradeSummary.profitTrades} of ${tradeSummary.totalTrades} trades`}
            icon={Target}
            trend="up"
            tooltip="Percentage of profitable trades."
            delay={0.6}
          />
        </div>

        <div className="mb-8">
          <PerformanceChart />
        </div>

        <div className="mb-8">
          <ROIChart />
        </div>

        <div className="mb-8">
          <TradeDistribution />
        </div>

        <div className="mb-8">
          <RiskMetricsGauge />
        </div>

        <div className="mb-8">
          <BenchmarkComparison />
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Expected payoff"
            value={`$${fmtMoney(expectedPayoff)}`}
            subtitle="Net profit per trade"
            icon={LineChart}
            trend="up"
            tooltip="Average net outcome per closed trade."
            delay={0.4}
          />
          <MetricCard
            title="Standard deviation"
            value={`${performanceMetrics.standardDeviation.toFixed(2)}%`}
            subtitle="Portfolio volatility"
            icon={BarChart3}
            trend="neutral"
            tooltip="Standard deviation of returns."
            delay={0.5}
          />
          <MetricCard
            title="Average loss"
            value={`$${Math.abs(averageLossTrade).toFixed(2)}`}
            subtitle="Per losing trade"
            icon={Activity}
            trend="down"
            tooltip="Average net loss on losing trades."
            delay={0.6}
          />
          <MetricCard
            title="Risk-free rate"
            value={`${performanceMetrics.riskFreeRate}%`}
            subtitle="UK English wording kept consistent"
            icon={BarChart3}
            trend="neutral"
            tooltip="Baseline rate used in the Sharpe ratio calculation."
            delay={0.7}
          />
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="High-water mark"
            value={`$${performanceMetrics.highWaterMark.toLocaleString()}`}
            subtitle="Peak portfolio value"
            icon={TrendingUp}
            trend="up"
            tooltip="The highest portfolio value achieved during the period."
            delay={0.8}
          />
          <MetricCard
            title="Hurdle rate"
            value={`${performanceMetrics.hurdleRate}%`}
            subtitle="Minimum target return"
            icon={Target}
            trend="neutral"
            tooltip="The minimum return threshold before performance fees apply."
            delay={0.9}
          />
          <MetricCard
            title="Average win"
            value={`$${averageProfitTrade.toFixed(2)}`}
            subtitle="Per profitable trade"
            icon={TrendingUp}
            trend="up"
            tooltip="Average net profit on winning trades."
            delay={1.0}
          />
          <MetricCard
            title="Total trades"
            value={tradeSummary.totalTrades}
            subtitle="Q4 2025 activity"
            icon={BarChart3}
            trend="neutral"
            tooltip="Total number of closed positions for the period."
            delay={1.1}
          />
        </div>

        <div className="mb-8">
          <InsightsTips />
        </div>

        <TradeHistory />
      </main>

      <footer className="mt-16 border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Blue Marvel Capital. All rights reserved.</p>
          <p className="mt-2">
            Performance simulation report generated from the supplied trade set.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
