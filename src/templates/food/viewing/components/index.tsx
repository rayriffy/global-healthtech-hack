import _ from 'lodash'
import React, { useContext, useEffect, useState } from 'react'

import AnimatedNumber from 'animated-number-react'
import { FaPhone, FaTimesCircle } from 'react-icons/fa'

import Img from 'gatsby-image'

import { Box, Card, Flex, Text } from 'rebass'
import styled from 'styled-components'

import databaseAllergies from '../../../../contents/database/allergies'

import { Subtitle } from '../../../../app/context'

import List from './list'
import Map from '../../../../core/components/map'

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
  overflow: hidden;
`

const DottedCard = styled(Card)`
  border-radius: 8px;
  border: 1px dashed #e8e8e8;
`

const WarningCard = styled(Card)`
  background: #ffffff;
  border-radius: 8px;
  border 1px solid #facc14;
  border-width: 1px 10px;
`

const FoodViewingComponent: React.FC<IProps> = props => {
  const {data} = props.pageContext

  const [, setSubtitle] = useContext(Subtitle)

  // 0 - Default, 1 - Cook, 2 - Shop
  const [eatOption, setEatOption] = useState<number>(0)

  const fetchedAllergies = _.filter(databaseAllergies, allergy => data.raw.allergies.includes(allergy.id))

  useEffect(() => {
    setSubtitle('recipe')
  }, [])

  return (
    <Flex justifyContent={`center`} py={4}>
      <Box width={[20/24, 16/24, 12/24, 8/24]}>
        <CoverCard>
          <Box my={[-120, -100, -80, 0]}>
            <Img fluid={data.image.childImageSharp.fluid} />
          </Box>
          <Box mt={[120, 100, 80, 0]} p={3}>
            <Box px={2}>
              <Text fontSize={26} fontWeight={600} pt={2} pb={1}>{data.raw.name}</Text>
              {!_.isEmpty(fetchedAllergies) ? (
                <Box py={2}>
                  <WarningCard p={3}>
                    <Text fontSize={16} fontWeight={700} pb={1}>ALLERGY ALERT!</Text>
                    <Text fontSize={14}>This food contains following ingredent: <b>{fetchedAllergies.map(allergy => allergy.name).join(', ')}</b></Text>
                  </WarningCard>
                </Box>
              ) : null}
              {!_.isEmpty(data.raw.desc) ? (
                <Box py={2}>
                  <Text fontSize={14}>{data.raw.desc}</Text>
                </Box>
              ) : null}
              <Box py={4}>
                <Flex flexWrap={`wrap`}>
                  <Box width={1 / 2}>
                    <Box>
                      <AnimatedNumber
                        duration={1000}
                        value={data.raw.fact.energy} 
                        formatValue={value => (
                          <Text fontSize={34} fontWeight={700} textAlign={`center`}>{Math.floor(value)}</Text>
                        )}
                      />
                    </Box>
                    <Text fontSize={16} fontWeight={600} color={`rgba(0, 0, 0, 0.65)`} textAlign={`center`}>ENERGY</Text>
                  </Box>
                  <Box width={1 / 2}>
                    <Box>
                      <AnimatedNumber
                        duration={1000}
                        value={data.raw.fact.sodium} 
                        formatValue={value => (
                          <Text fontSize={34} fontWeight={700} textAlign={`center`}>{Math.floor(value)}</Text>
                        )}
                      />
                    </Box>
                    <Text fontSize={16} fontWeight={600} color={`rgba(0, 0, 0, 0.65)`} textAlign={`center`}>SODIUM</Text>
                  </Box>
                </Flex>
              </Box>
              <Box py={2}>
                <Text fontSize={18} fontWeight={700}>NUTRIENTS</Text>
                <Text fontSize={16} color={`rgba(0, 0, 0, 0.65)`} pb={1}>For serving</Text>
                <Box p={3}>
                  <BorderedCard p={3}>
                    <List name={`Carbohydrate`} desc={`${data.raw.nutrients.carbohydrate} g`} />
                    <List name={`Fat`} desc={`${data.raw.nutrients.fat} g`} />
                  </BorderedCard>
                </Box>
              </Box>
              <Box py={2}>
                <Text fontSize={18} fontWeight={700}>INGREDENTS</Text>
                <Text fontSize={16} color={`rgba(0, 0, 0, 0.65)`} pb={1}>For {data.raw.serving} servings</Text>
                <Box p={3}>
                  <BorderedCard p={3}>
                    {_.sortBy(data.raw.ingredents, o => _.capitalize(o.name)).map(ingredent => {
                      return (
                        <List key={`list-ingredent-${ingredent.name}`} name={_.capitalize(ingredent.name)} desc={ingredent.amount !== null ? `${_.last(Number(ingredent.amount).toFixed(2).split('.')) === '00' ? ingredent.amount : Number(ingredent.amount).toFixed(2)}${ingredent.unit !== null ? ` ${ingredent.unit}` : ''}` : null} />
                      )
                    })}
                  </BorderedCard>
                </Box>
              </Box>
              <Box py={2}>
              {eatOption === 0 ? (
                <Flex justifyContent={`center`} alignItems={`center`} flexWrap={`wrap`}>
                  <Box onClick={() => setEatOption(1)}>
                    <DottedCard px={4} py={3}>
                      <Text fontSize={14} color={`#5c6b77`}>Cook by yourself</Text>
                    </DottedCard>
                  </Box>
                  <Box px={2} py={2} width={[1, 1, `auto`, `auto`]}>
                    <Text fontSize={12} textAlign={`center`}>OR</Text>
                  </Box>
                  <Box onClick={() => setEatOption(2)}>
                    <DottedCard px={4} py={3}>
                      <Text fontSize={14} color={`#5c6b77`}>Find a store</Text>
                    </DottedCard>
                  </Box>
                </Flex>
              ) : eatOption === 1 ? (
                <Box>
                  <Flex alignItems={`center`}>
                    <Box>
                      <Text fontSize={18} fontWeight={700}>PREPARATION</Text>
                      <Text fontSize={16} color={`rgba(0, 0, 0, 0.65)`} pb={1}>For {data.raw.serving} servings</Text>
                    </Box>
                    <Box mx={`auto`} />
                    <Box px={3} onClick={() => setEatOption(0)}>
                      <FaTimesCircle size={`20px`} />
                    </Box>
                  </Flex>
                  <Box p={3}>
                    <BorderedCard p={3}>
                      {data.raw.preparation.map((step, i) => {
                        return (
                          <Flex key={`preparation-step-${i}`} flexWrap={`wrap`} py={1}>
                            <Box width={1 / 10}><Text fontSize={14} fontWeight={600}>{i + 1}</Text></Box>
                            <Box width={9 / 10}><Text fontSize={14}>{step}</Text></Box>
                          </Flex>
                        )
                      })}
                    </BorderedCard>
                  </Box>
                </Box>
              ) : eatOption === 2 ? (
                <Box>
                  <Flex alignItems={`center`}>
                    <Box>
                      <Text fontSize={18} fontWeight={700}>FIND STORE</Text>
                      <Text fontSize={16} color={`rgba(0, 0, 0, 0.65)`} pb={1}>Found 1 store</Text>
                    </Box>
                    <Box mx={`auto`} />
                    <Box onClick={() => setEatOption(0)}>
                      <FaTimesCircle size={`20px`} />
                    </Box>
                  </Flex>
                  <Box p={3}>
                    <BorderedCard>
                      <Box height={`150px`}>
                        <Map lat={13.7928619} lon={100.3248977} />
                      </Box>
                      <Box p={3}>
                        <Text fontSize={16} fontWeight={600}>Brew & Brev</Text>
                        <Text fontSize={14} py={2}>999 Mahidol University, Salaya, Phutthamonthon, Nakhon Pathom, Thailand 73170</Text>
                        <Flex alignItems={`center`}>
                          <Box>
                            <FaPhone />
                          </Box>
                          <Text px={2} fontSize={14}>02-441-0298</Text>
                        </Flex>
                      </Box>
                    </BorderedCard>
                  </Box>
                </Box>
              ) : null}
              </Box>
            </Box>
          </Box>
        </CoverCard>
      </Box>
    </Flex>
  )
}

export default FoodViewingComponent
