import React from 'react'

import { Box, Flex, Text } from 'rebass'

import { IListProps } from '../@types/IListProps'

const ListComponent: React.FC<IListProps> = props => {
  const {name, desc} = props

  return (
    <Box pt={1}>
      <Flex>
        <Text fontSize={14} fontWeight={500}>{name}</Text>
        <Box mx={`auto`} />
        {desc !== null ? <Text fontSize={14}>{desc}</Text> : null}
      </Flex>
    </Box>
  )
}

export default ListComponent
