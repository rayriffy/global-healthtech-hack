export const checkHighHR = (age: number, heartrate: number): boolean => {
  if (age >= 20 && age < 30) {
    return heartrate > 170
  } else if (age >= 30 && age < 40) {
    return heartrate > 162 
  } else if (age >= 40 && age < 45) {
    return heartrate > 157
  } else if (age >= 45 && age < 50) {
    return heartrate > 153
  }
}