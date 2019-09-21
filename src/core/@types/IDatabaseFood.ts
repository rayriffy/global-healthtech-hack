import { IIngredent } from './IIngredent'

export interface IDatabaseFood {
  id: string
  name: string
  desc: string | null
  serving: number
  fact: {
    energy: number
    sodium: number
  }
  nutrients: {
    carbohydrate: number
    fat: number
  }
  ingredents: IIngredent[]
  allergies: string[]
}
