import { FluidObject } from 'gatsby-image'

import { IDatabaseFood } from './IDatabaseFood'

export interface IFetchedFood {
  raw: IDatabaseFood
  image: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}
