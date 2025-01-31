export function darkenColor(
  color: string,
  isDarkMode: boolean = false,
  amount: number = 50
): string {
  const adjustedAmount = isDarkMode ? -amount + amount / 2 : amount;

  const rgbMatch = color.match(/\d+/g);
  if (!rgbMatch) return color;

  const [r, g, b] = rgbMatch.map(Number);

  const darkenedR = Math.max(r - adjustedAmount, 0);
  const darkenedG = Math.max(g - adjustedAmount, 0);
  const darkenedB = Math.max(b - adjustedAmount, 0);

  return `rgb(${darkenedR}, ${darkenedG}, ${darkenedB})`;
}
