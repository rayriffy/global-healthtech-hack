import React from 'react'

import { IProps } from '../@types/IProps'

const FoodListingComponent: React.FC<IProps> = props => {
  const {data} = props.pageContext

  return (
    <>OK</>
  )
}

export default FoodListingComponent
