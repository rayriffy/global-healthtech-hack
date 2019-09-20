import React from 'react'

import { IProps } from '../@types/IProps'

const FoodViewingComponent: React.FC<IProps> = props => {
  const {data} = props.pageContext

  return (
    <>OK</>
  )
}

export default FoodViewingComponent
