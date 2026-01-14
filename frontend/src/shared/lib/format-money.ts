export const formatMoney = (num: number): string => {
  const abs = Math.abs(num)
  const [integerPart, decimalPart = ''] = abs.toFixed(2).split('.')

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  const formatted = decimalPart
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger

  if (num < 0) return `-${formatted}`
  return formatted
}
