interface IReturn {
  check: boolean,
  diff: number
}

export const checkHighFat = (gender: 'm' | 'f', fatPercent: number): IReturn => {
  if(gender === 'm'){
    return {
      check: fatPercent > 19,
      diff: fatPercent - 19
    }
  } else {
    return {
      check: fatPercent > 33,
      diff: fatPercent - 33
    }
  }
}
