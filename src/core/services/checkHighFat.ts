export const checkHighFat = (gender: 'm' | 'f', fatPercent: number): boolean => {
  if(gender === 'm'){
    return fatPercent > 19
  } else {
    return fatPercent > 33
  }
}
