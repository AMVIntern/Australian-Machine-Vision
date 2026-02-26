import { cn } from "@/lib/utils";
import type { StoryMetric } from "@/lib/customer-stories";

export interface MetricCardProps {
  metric: StoryMetric;
  className?: string;
}

export function MetricCard({ metric, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-accent-primary/5 px-6 py-5 text-center",
        "border-accent-primary/20",
        className
      )}
    >
      <p className="text-2xl font-bold tabular-nums text-foreground sm:text-3xl">
        {metric.value}
      </p>
      <p className="mt-1 text-sm text-foreground-muted">{metric.label}</p>
    </div>
  );
}
