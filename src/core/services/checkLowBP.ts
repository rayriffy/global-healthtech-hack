interface IReturn {
  check: boolean
  diffSBP: number
  diffDBP: number
}
  
export const checkLowBP = (SBP: number, DBP: number): IReturn => {
  return {
    check: SBP <= 110 && DBP <= 70,
    diffSBP: 110 - SBP,
    diffDBP: 70 - DBP
  }
}