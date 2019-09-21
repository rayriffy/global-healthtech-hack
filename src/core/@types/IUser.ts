export interface IUser {
  name: string
  birthday: string
  gender: 'm' | 'f'
  body: {
    weight: number
    height: number
    fat: number
    bloodPressure: {
      high: number
      low: number
    }
    heartrate: number
  }
  diabetes: boolean
  allergies: string[]
}
