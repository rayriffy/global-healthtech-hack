interface IReturn {
  check: boolean
  diff: number
}

export const checkHighHR = (age: number, heartrate: number): IReturn => {
    if (age < 30) {
      return {
        check: heartrate > 170,
        diff: heartrate - 170
      }
    } else if (age >= 30 && age < 40) {
      return {
        check: heartrate > 162,
        diff: heartrate - 162
      }
    } else if (age >= 40 && age < 45) {
      return {
        check: heartrate > 157,
        diff: heartrate - 157
      }
    } else if (age >= 45 && age < 50) {
      return {
        check: heartrate > 153,
        diff: heartrate - 153
      }
    } else if (age >= 50 && age < 55) {
      return {
        check: heartrate > 149,
        diff: heartrate - 149
      }
    } else if (age >= 55 && age < 60) {
      return {
        check: heartrate > 145,
        diff: heartrate - 145
      }
    } else if (age >= 60 && age < 65) {
      return {
        check: heartrate > 140,
        diff: heartrate - 140
      }
    } else if (age >= 65 && age < 70) {
      return {
        check: heartrate > 136,
        diff: heartrate - 136
      }
    } else if (age >= 70) {
      return {
        check: heartrate > 128,
        diff: heartrate - 128
      }
    }
  }