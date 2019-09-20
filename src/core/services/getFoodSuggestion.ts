import { getBMI } from './getBMI'

import { IFetchedFood } from '../@types/IFetchedFood'
import { IUser } from '../@types/IUser'

export const getFoodSuggestion = (user: IUser, foods: IFetchedFood): IFetchedFood[] => {
  const BMI = getBMI(user.body.weight, user.body.height)
  
}
