export function cx(...args: Array<string | false | null | undefined>): string {
  return args.filter(Boolean).join(' ');
}

export function twMerge(...args: Array<string | false | null | undefined>): string {
  return cx(...args);
}
