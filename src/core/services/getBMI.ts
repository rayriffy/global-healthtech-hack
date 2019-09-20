export const getBMI = (weight: number, height: number): number => {
  return weight * 10000 / (height * height)
}
