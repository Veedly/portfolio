import { defaultLocale, type Locale } from "./config";

export type Localized<T> = Partial<Record<Locale, T>>;

export function localize<T>(value: Localized<T> | T | null | undefined, locale: Locale): T | undefined {
  if (!value) return undefined;
  if (typeof value !== "object" || Array.isArray(value)) return value as T;

  const localized = value as Localized<T>;
  return localized[locale] ?? localized[defaultLocale];
}

export function localizeRequired<T>(value: Localized<T> | T | null | undefined, locale: Locale, fallback: T): T {
  return localize(value, locale) ?? fallback;
}
