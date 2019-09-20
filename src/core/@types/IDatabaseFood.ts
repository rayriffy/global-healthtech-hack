import { IIngredent } from './IIngredent'
import { IVitamin } from './IVitamin'

export interface IDatabaseFood {
  id: string
  name: string
  desc: string
  serving: number
  fact: {
    energy: number
    sodium: number
  }
  nutrients: {
    carbohydrate: number
    fat: number
  }
  vitamins: IVitamin[]
  ingredents: IIngredent[]
  allergies: string[]
}
