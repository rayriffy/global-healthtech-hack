export const checkLowHR = (age: number, heartrate: number): boolean => {
    if (age >= 20 && age < 30) {
      return heartrate < 100
    } else if (age >= 30 && age < 40) {
      return heartrate < 95 
    } else if (age >= 40 && age < 45) {
      return heartrate < 93
    } else if (age >= 45 && age < 50) {
      return heartrate < 90
    } else if (age >= 50 && age < 55) {
      return heartrate < 88
    } else if (age >= 55 && age < 60) {
      return heartrate < 85
    } else if (age >= 60 && age < 65) {
      return heartrate < 83
    } else if (age >= 65 && age < 70) {
      return heartrate < 80
    } else if (age >= 70) {
      return heartrate < 75
    }
  }