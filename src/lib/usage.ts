interface DailyUsage {
  date: string;
  count: number;
}

const STORAGE_KEY = "ecc_daily_usage";
export const ANONYMOUS_LIMIT = 3;
export const LOGGED_IN_LIMIT = 10;

export function getAnonymousUsage(): DailyUsage {
  if (typeof window === "undefined") {
    return { date: new Date().toISOString().split("T")[0], count: 0 };
  }

  const today = new Date().toISOString().split("T")[0];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return { date: today, count: 0 };

  const usage: DailyUsage = JSON.parse(stored);
  if (usage.date !== today) return { date: today, count: 0 };
  return usage;
}

export function incrementAnonymousUsage(): void {
  const usage = getAnonymousUsage();
  usage.count += 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
}

export function canUseAnonymously(): boolean {
  return getAnonymousUsage().count < ANONYMOUS_LIMIT;
}

export function getRemainingAnonymousUses(): number {
  return Math.max(0, ANONYMOUS_LIMIT - getAnonymousUsage().count);
}
