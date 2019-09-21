interface IReturn {
  check: boolean
  diffSBP: number
  diffDBP: number
}

export const checkHighBP = (SBP: number, DBP: number): IReturn => {
  return {
	  check: SBP >= 140 && DBP >= 90,
	  diffSBP: SBP - 140,
	  diffDBP: DBP - 90
  }
}