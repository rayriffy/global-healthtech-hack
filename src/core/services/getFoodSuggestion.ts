import _ from 'lodash'

import { getBMI } from './getBMI'
import { checkHighFat } from './checkHighFat'
import { checkLowFat } from './checkLowFat'
import { checkHighBP } from './checkHighBP'
import { checkLowBP } from './checkLowBP'
import { checkHighHR } from './checkHighHR'
import { checkLowHR } from './checkLowHR'
import { getAge } from './getAge'

import { IFetchedFood } from '../@types/IFetchedFood'
import { IUser } from '../@types/IUser'

const normEnergy = 667, normCarb = 75, normFat = 20, normNa = 1000
var recommendEnergy = normEnergy, recommendCarb = normCarb, recommendFat = normFat, recommendNa = normNa

export const getFoodSuggestion = (user: IUser, foods: IFetchedFood[]): IFetchedFood[] => {
  if (user === null) {
    return foods
  } else {
    const {weight, height, heartrate, fat, bloodPressure} = user.body
  
    const BMI = getBMI(weight, height)
    const HighFat = checkHighFat(user.gender, fat)
    const LowFat = checkLowFat(user.gender, fat)
    const HighBP = checkHighBP(bloodPressure.high, bloodPressure.low)
    const LowBP = checkLowBP(bloodPressure.high, bloodPressure.low)
    const HighHR = checkHighHR(getAge(user.birthday), heartrate)
    const LowHR = checkLowHR(getAge(user.birthday), heartrate)
    const Diabetes = user.diabetes
  
    const Allergies = user.allergies
    
    const filteredFood = _.filter(foods, food => _.isEmpty(_.intersection(food.raw.allergies, Allergies)))
    
    if(BMI > 25){
      recommendEnergy = recommendEnergy - (20 * (BMI - 25)) / 21.5
      recommendCarb = recommendCarb - (5 * (BMI - 25)) / 21.5
      recommendFat = recommendFat - (2 * (BMI - 25)) / 21.5
    } else if (BMI < 18){
      recommendEnergy = recommendEnergy + (20 * (18 - BMI)) / 21.5
      recommendCarb = recommendCarb + (5 * (18 - BMI)) / 21.5
      recommendFat = recommendFat + (2 * (18 - BMI)) / 21.5
    }

    if(HighFat.check){
      recommendFat = recommendFat - HighFat.diff
    } else if(LowFat.check){
      recommendFat = recommendFat + LowFat.diff
    }

    if(HighHR.check){
      recommendCarb = recommendCarb - (HighHR.diff / 2)
      recommendFat = recommendFat - (HighHR.diff / 4)
      recommendNa = recommendNa - (HighHR.diff * 10)
    } else if (LowHR.check){
      recommendNa = recommendNa + (LowHR.diff * 10)
    }

    if(HighBP.check){
      recommendCarb = recommendCarb - ((HighBP.diffSBP + HighBP.diffDBP) / 4)
      recommendFat = recommendFat - ((HighBP.diffSBP + HighBP.diffDBP) / 8)
      recommendNa = recommendNa - ((HighBP.diffSBP + HighBP.diffDBP) * 5)
    } else if (LowBP.check){
      recommendNa = recommendNa + ((HighBP.diffSBP + HighBP.diffDBP) * 5)
    }

    if(Diabetes){
      recommendCarb = recommendCarb - 20
    }
    
    switch(true){
      case Diabetes && (HighBP.check || HighHR.check):
          return _.sortBy(filteredFood, [
            o => Math.abs(recommendCarb - o.raw.nutrients.carbohydrate),
            o => Math.abs(recommendNa - o.raw.fact.sodium),
            o => Math.abs(recommendFat - o.raw.nutrients.fat),
            o => Math.abs(recommendEnergy - o.raw.fact.energy)
          ])
      case Diabetes:
        return _.sortBy(filteredFood, [
          o => Math.abs(recommendCarb - o.raw.nutrients.carbohydrate),
          o => Math.abs(recommendEnergy - o.raw.fact.energy), 
          o => Math.abs(recommendFat - o.raw.nutrients.fat)
        ])
      case HighBP.check || HighHR.check:
        return _.sortBy(filteredFood, [
          o => Math.abs(recommendNa - o.raw.fact.sodium),
          o => Math.abs(recommendFat - o.raw.nutrients.fat),
          o => Math.abs(recommendEnergy - o.raw.fact.energy)
        ])
      default:
        return _.sortBy(filteredFood, [
          o => Math.abs(recommendEnergy - o.raw.fact.energy),
          o => Math.abs(recommendCarb - o.raw.nutrients.carbohydrate),
          o => Math.abs(recommendFat - o.raw.nutrients.fat),
          o => Math.abs(recommendNa - o.raw.fact.sodium)
        ])
    }
  }
}
