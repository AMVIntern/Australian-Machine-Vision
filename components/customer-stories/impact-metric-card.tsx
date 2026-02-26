import { TrendingUp, DollarSign, Search, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ResultMetric } from "@/lib/customer-stories";

const iconMap = {
  trending: TrendingUp,
  savings: DollarSign,
  inspection: Search,
  latency: Timer,
};

export interface ImpactMetricCardProps {
  metric: ResultMetric;
  className?: string;
}

export function ImpactMetricCard({ metric, className }: ImpactMetricCardProps) {
  const Icon = metric.icon ? iconMap[metric.icon] : null;

  return (
    <div
      className={cn(
        "rounded-xl border border-accent-primary/30 bg-white px-5 py-5 shadow-soft",
        className
      )}
    >
      {Icon && (
        <span
          className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary"
          aria-hidden
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>
      )}
      <p className="text-2xl font-bold tabular-nums text-foreground sm:text-3xl">
        {metric.value}
      </p>
      <p className="mt-1 text-sm font-medium text-foreground">
        {metric.label}
      </p>
      {metric.subDescription && (
        <p className="mt-1 text-xs text-foreground-muted">
          {metric.subDescription}
        </p>
      )}
    </div>
  );
}
