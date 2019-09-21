import _ from 'lodash'

import { getBMI } from './getBMI'
import { checkHighFat } from './checkHighFat'
import { checkHighBP } from './checkHighBP'
import { checkLowBP } from './checkLowBP'
import { checkHighHR } from './checkHighHR'
import { checkLowHR } from './checkLowHR'
import { getAge } from './getAge'

import { IFetchedFood } from '../@types/IFetchedFood'
import { IUser } from '../@types/IUser'

export const getFoodSuggestion = (user: IUser, foods: IFetchedFood[]): IFetchedFood[] => {
  const {weight, height, heartrate, fat, bloodPressure} = user.body

  const BMI = getBMI(weight, height)
  const HighFat = checkHighFat(user.gender, fat)
  const HighBP = checkHighBP(bloodPressure.high, bloodPressure.low)
  const LowBP = checkLowBP(bloodPressure.high, bloodPressure.low)
  const HighHR = checkHighHR(getAge(user.birthday), heartrate)
  const LowHR = checkLowHR(getAge(user.birthday), heartrate)
  const Diabetes = user.diabetes

  const Allergies = user.allergies
  
  const filteredFood = _.filter(foods, food => _.isEmpty(_.intersection(food.raw.allergies, Allergies)))
  
  if (BMI > 25) {
    return _.sortBy(filteredFood, [o => o.raw.fact.energy])
  } else if (HighFat) {
    return _.sortBy(filteredFood, [o => o.raw.nutrients.fat])
  } else if (HighBP) {
    return _.sortBy(filteredFood, [o => o.raw.fact.sodium])
  } else if (LowBP) {
    return _.sortBy(filteredFood, [o => o.raw.fact.sodium]).reverse()
  } else if (HighHR) {
    return _.sortBy(filteredFood, [o => o.raw.nutrients.carbohydrate])
  } else if (LowHR) {
    return _.sortBy(filteredFood, [o => o.raw.fact.sodium]).reverse()
  } else if (Diabetes) {
    return _.sortBy(filteredFood, [o => o.raw.nutrients.carbohydrate])
  }
}
