export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function RecordLookup<T, K extends keyof T>(obj: T, k: K) {
  return obj[k];
}
