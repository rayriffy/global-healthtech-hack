import { FluidObject } from 'gatsby-image'

import { IDatabaseFood } from './IDatabaseFood'

export interface IFetchedFood {
  data: IDatabaseFood
  image: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}
