import React, { useContext, useEffect, useState } from 'react'
import { FaFire } from 'react-icons/fa'

import Img from 'gatsby-image'

import { Box, Flex, Card, Text } from 'rebass'
import styled from 'styled-components'

import { UserData, Subtitle } from '../../../../app/context'

import TransparentLink from '../../../../core/components/transparentLink'

import { getFoodSuggestion } from '../../../../core/services/getFoodSuggestion'

import { IProps } from '../@types/IProps'
import { IFetchedFood } from '../../../../core/@types/IFetchedFood'

interface IGatsbyImage {
  height?: number
}

const GatsbyImage = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height: ${(props: IGatsbyImage) => props.height || 'auto'};
`

const PosterCard = styled(Card)`
  position: relative;
  border-radius: 6px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  background-color: rgba(0, 0, 0, 0.3);
  overflow: hidden;
`

const FoodListingComponent: React.FC<IProps> = props => {
  const {data} = props.pageContext

  const [foods, setFoods] = useState<IFetchedFood[]>([])

  const [, setSubtitle] = useContext(Subtitle)
  const [userData] = useContext(UserData)

  useEffect(() => {
    setSubtitle('listing')

    const filteredFoods = getFoodSuggestion(userData, data)

    console.log(filteredFoods)
    setFoods(filteredFoods)
  }, [])

  return (
    <Flex justifyContent={`center`} py={4}>
      <Box width={22 / 24}>
        <Flex flexWrap={`wrap`}>
          {foods.map(node => {
            return (
              <Box width={[1 / 2, 1 / 3, 1 / 3, 1 /4]} p={[1, 2]} key={`card-food-${node.raw.id}`}>
                <TransparentLink to={`/food/${node.raw.id}`}>
                <PosterCard>
                  <GatsbyImage fluid={node.image.childImageSharp.fluid} />
                  <Box p={3} style={{ position: 'absolute', left: '0', bottom: '0' }}>
                    <Text fontSize={[20, 22, 24, 26]} fontWeight={600} color={`white`}>{node.raw.name}</Text>
                    <Flex alignItems={`center`}>
                      <FaFire color={`white`} size={`16px`} />
                      <Text fontSize={[14, 16, 18, 20]} color={`white`} px={1}>{node.raw.fact.energy} kcal</Text>
                    </Flex>
                  </Box>
                </PosterCard>
                </TransparentLink>
              </Box>
            )
          })}
        </Flex>
      </Box>
    </Flex>
  )
}

export default FoodListingComponent
