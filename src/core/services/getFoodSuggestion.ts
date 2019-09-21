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
  const BMI = getBMI(user.body.weight, user.body.height)
  const HighFat = checkHighFat(user.gender, user.body.fat)
  const HighBP = checkHighBP(user.body.bloodPressure.high, user.body.bloodPressure.low)
  const LowBP = checkLowBP(user.body.bloodPressure.high, user.body.bloodPressure.low)
  const HighHR = checkHighHR(getAge(user.birthday), user.body.heartrate)
  const LowHR = checkLowHR(getAge(user.birthday), user.body.heartrate)
  const Diabetes = user.diabetes
  const Allergies = user.allergies
  
  const filteredFood = _.filter(foods, food => _.isEmpty(_.intersection(food.raw.allergies, Allergies)))
  
  if(BMI > 25){
    _.sortBy(filteredFood, [o => o.raw.fact.energy])
  }
  
  if(HighFat){
    _.sortBy(filteredFood, [o => o.raw.nutrients.fat])
  }

  if(HighBP){
    _.sortBy(filteredFood, [o => o.raw.fact.sodium])
  }

  if(LowBP){
    _.sortBy(filteredFood, [o => o.raw.fact.sodium]).reverse()
  }

  if(HighHR){
    _.sortBy(filteredFood, [o => o.raw.nutrients.carbohydrate])
  }

  if(LowHR){
    _.sortBy(filteredFood, [o => o.raw.fact.sodium]).reverse()
  }

  if(Diabetes){
    _.sortBy(filteredFood, [o => o.raw.nutrients.carbohydrate])
  }
}
