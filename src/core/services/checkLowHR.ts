interface IReturn {
  check: boolean
  diff: number
}

export const checkLowHR = (age: number, heartrate: number): IReturn => {
    if (age < 30) {
      return {
        check: heartrate < 100,
        diff: 100 - heartrate
      }
    } else if (age >= 30 && age < 40) {
      return {
        check: heartrate < 95,
        diff: 95 - heartrate
      }
    } else if (age >= 40 && age < 45) {
      return {
        check: heartrate < 93,
        diff: 93 - heartrate
      }
    } else if (age >= 45 && age < 50) {
      return {
        check: heartrate < 90, 
        diff: 90 - heartrate}
    } else if (age >= 50 && age < 55) {
      return {
        check: heartrate < 88, 
        diff: 88 - heartrate
      }
    } else if (age >= 55 && age < 60) {
      return {
        check: heartrate < 85, 
        diff: 85 - heartrate
      }
    } else if (age >= 60 && age < 65) {
      return {
        check: heartrate < 83, 
        diff: 83 - heartrate
      }
    } else if (age >= 65 && age < 70) {
      return {
        check: heartrate < 80, 
        diff: 80 - heartrate
      }
    } else if (age >= 70) {
      return {
        check: heartrate < 75,
        diff: 75 - heartrate
      }
    }
  }