import React, { useContext } from 'react'

import { FaHome, FaUser } from 'react-icons/fa'

import { Box, Flex, Text } from 'rebass'

import Divider from '../../core/components/divider'
import TransparentLink from '../../core/components/transparentLink'

import { Subtitle } from '../context'

const HeaderComponent = () => {
  const [subtitle] = useContext(Subtitle)

  return (
    <Box>
      <Flex alignItems={`center`}>
        <Flex alignItems={`flex-end`} flexWrap={`wrap`}>
          <Text fontSize={42} fontWeight={700}>DietCare</Text>
          <Text fontSize={30} fontWeight={600} color={`rgba(0, 0, 0, 0.45)`} px={2} pb={2}>{subtitle}</Text>
        </Flex>
        <Box mx={`auto`} />
        <Box>
          <Flex>
            <Box px={2}>
              <TransparentLink to={`/`}>
                <FaHome color={`black`} size={`32px`} />
              </TransparentLink>
            </Box>
            <Box px={2}>
              <TransparentLink to={`/user    `}>
                <FaUser color={`black`} size={`32px`} />
              </TransparentLink>
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Divider py={1} />
    </Box>
  )
}

export default HeaderComponent
