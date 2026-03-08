"use client";

import { useEffect, useMemo, useState } from "react";
import { FiAward, FiBriefcase, FiMapPin, FiUsers } from "react-icons/fi";

type StatItem = { value: string; label: string };

type StatCardProps = {
  item: StatItem;
  icon: React.ReactNode;
};

const parseStatValue = (raw: string) => {
  const numberPart = Number.parseInt(raw.replace(/[^0-9]/g, ""), 10);
  const suffix = raw.replace(/[0-9]/g, "") || "";
  return {
    number: Number.isNaN(numberPart) ? 0 : numberPart,
    suffix,
  };
};

function StatCard({ item, icon }: StatCardProps) {
  const { number, suffix } = useMemo(() => parseStatValue(item.value), [item.value]);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frameId = 0;
    const duration = 1200;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const nextValue = Math.round(number * progress);
      setDisplayValue(nextValue);
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [number]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-2 hover-border-accent-300 hover:shadow-md glass-soft">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
          {icon}
        </span>
        <p className="text-2xl font-semibold text-slate-800">
          {displayValue}
          {suffix}
        </p>
        <p className="text-sm text-slate-600">{item.label}</p>
      </div>
    </div>
  );
}

const defaultIcons = [FiAward, FiBriefcase, FiMapPin, FiUsers];

export default function StatsGrid({ items }: { items: StatItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => {
        const Icon = defaultIcons[index] ?? defaultIcons[0];
        return (
          <StatCard
            key={item.label}
            item={item}
            icon={<Icon className="h-5 w-5" />}
          />
        );
      })}
    </div>
  );
}
