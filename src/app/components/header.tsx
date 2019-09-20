import React, { useContext } from 'react'

import { Box, Flex, Text } from 'rebass'

import Divider from '../../core/components/divider'

import { Subtitle } from '../context'

const HeaderComponent = () => {
  const [subtitle] = useContext(Subtitle)

  return (
    <Box>
      <Flex alignItems={`center`}>
        <Flex alignItems={`flex-end`} flexWrap={`wrap`}>
          <Text fontSize={42} fontWeight={700}>HackTech</Text>
          <Text fontSize={30} fontWeight={600} color={`rgba(0, 0, 0, 0.45)`} px={2} pb={2}>{subtitle}</Text>
        </Flex>
        <Box mx={`auto`} />
      </Flex>
      <Divider py={1} />
    </Box>
  )
}

export default HeaderComponent
