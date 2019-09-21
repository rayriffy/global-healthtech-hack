interface IReturn {
    check: boolean,
    diff: number
  }
  
  export const checkLowFat = (gender: 'm' | 'f', fatPercent: number): IReturn => {
    if(gender === 'm'){
      return {
        check: fatPercent < 8,
        diff: 8 - fatPercent
      }
    } else {
      return {
        check: fatPercent < 21,
        diff: 21 - fatPercent
      }
    }
  }
  