export const passcode = (str: string): string =>
  str
    .split(" ")
    .map((word) => word.toLowerCase().charAt(0))
    .join("");
