import _ from 'lodash'
import React from 'react'

import Img from 'gatsby-image'

import { Box, Card, Flex, Text } from 'rebass'
import styled from 'styled-components'

import { IProps } from '../@types/IProps'

const CoverCard = styled(Card)`
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`

const BorderedCard = styled(Card)`
  border-radius: 8px;
  border: 1px solid #e8e8e8;
`

const FoodViewingComponent: React.FC<IProps> = props => {
  const {data} = props.pageContext

  return (
    <Flex justifyContent={`center`} py={3}>
      <Box width={[20/24, 16/24, 12/24, 8/24]}>
        <CoverCard>
          <Box my={[-120, -100, -80, 0]}>
            <Img fluid={data.image.childImageSharp.fluid} />
          </Box>
          <Box mt={[120, 100, 80, 0]} p={3}>
            <Box px={2}>
              <Text fontSize={24} fontWeight={600} pt={2} pb={1}>{data.raw.name}</Text>
              {!_.isEmpty(data.raw.desc) ? (
                <Box py={2}>
                  <Text fontSize={14}>{data.raw.desc}</Text>
                </Box>
              ) : null}
              <Box py={4}>
                <Flex flexWrap={`wrap`}>
                  <Box width={1 / 2}>
                    <Text fontSize={34} fontWeight={700} textAlign={`center`}>{data.raw.fact.energy}</Text>
                    <Text fontSize={16} fontWeight={600} color={`rgba(0, 0, 0, 0.65)`} textAlign={`center`}>ENERGY</Text>
                  </Box>
                  <Box width={1 / 2}>
                    <Text fontSize={34} fontWeight={700} textAlign={`center`}>{data.raw.fact.sodium}</Text>
                    <Text fontSize={16} fontWeight={600} color={`rgba(0, 0, 0, 0.65)`} textAlign={`center`}>SODIUM</Text>
                  </Box>
                </Flex>
              </Box>
              <Box py={2}>
                <Text fontSize={18} fontWeight={700}>NUTRIENTS</Text>
                <Box p={3}>
                  <BorderedCard p={3}>
                    <Box pt={1}>
                      <Flex>
                        <Text fontSize={14} fontWeight={500}>Carbohydrate</Text>
                        <Box mx={`auto`} />
                        <Text fontSize={14}>{data.raw.nutrients.carbohydrate}</Text>
                      </Flex>
                    </Box>
                    <Box pt={1}>
                      <Flex>
                        <Text fontSize={14} fontWeight={500}>Fat</Text>
                        <Box mx={`auto`} />
                        <Text fontSize={14}>{data.raw.nutrients.fat}</Text>
                      </Flex>
                    </Box>
                  </BorderedCard>
                </Box>
              </Box>
              <Box py={2}>
                <Text fontSize={18} fontWeight={700}>INGREDENTS</Text>
                <Box p={3}>
                  <BorderedCard p={3}>
                    {data.raw.ingredents.map(ingredent => {
                      return (
                        <Box pt={1}>
                          <Flex>
                            <Text fontSize={14} fontWeight={500}>{ingredent.name}</Text>
                            <Box mx={`auto`} />
                            {ingredent.amount !== null ? <Text fontSize={14}>{ingredent.amount} {ingredent.unit}</Text> : null}
                          </Flex>
                        </Box>
                      )
                    })}
                  </BorderedCard>
                </Box>
              </Box>
            </Box>
          </Box>
        </CoverCard>
      </Box>
    </Flex>
  )
}

export default FoodViewingComponent
