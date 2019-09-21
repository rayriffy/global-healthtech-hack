import _ from 'lodash'
import React, { useContext, useEffect, useState } from 'react'

import {set} from 'local-storage'

import { Box, Card, Flex, Text } from 'rebass'
import styled from 'styled-components'

import databaseAllergy from '../contents/database/allergies'

import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { Subtitle, UserData } from '../app/context'

import { IUser } from '../core/@types/IUser'

const TextInput = styled(TextField)`
  width: 100%;
`

const BorderedCard = styled(Card)`
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  overflow: hidden;
`

const UserComponent: React.FC = props => {
  const [userData, setUserData] = useContext(UserData)
  const [, setSubtitle] = useContext(Subtitle)

  const defaultInput: IUser = {
    name: null,
    birthday: null,
    gender: null,
    body: {
      weight: null,
      height: null,
      fat: null,
      bloodPressure: {
        high: null,
        low: null,
      },
      heartrate: null,
    },
    diabetes: false,
    allergies: []
  }

  const [input, setInput] = useState(defaultInput)

  const [done, setDone] = useState(false)

  const saveInput = () => {
    setUserData(input)
    set('user', JSON.stringify(input))

    setDone(true)
  }

  useEffect(() => {
    setSubtitle('user')

    if (userData !== null) {
      setInput(userData)
    }
  }, [])

  return (
    <Flex justifyContent={`center`} py={4}>
      <Box width={[20/24, 16/24, 12/24, 8/24]}>
        <Text fontSize={28} fontWeight={600} py={2}>User Management</Text>
        <Box py={2}>
          <BorderedCard p={3}>
            {!done ? (
              <Box>
                <Text fontSize={20} fontWeight={500}>Basics</Text>
                <Flex flexWrap={`wrap`}>
                  <Box width={1}>
                    <TextInput
                      label={`Name`}
                      value={_.toString(input.name)}
                      onChange={e => {
                        setInput({...input, name: e.target.value})
                      }}
                      margin={`none`}
                    />
                  </Box>
                  <Box p={1} width={1 / 2}>
                    <TextInput
                      label={`Weight`}
                      value={_.toString(input.body.weight)}
                      onChange={e => {
                        if (!Number.isNaN(_.toNumber(e.target.value))) {
                          setInput({...input, body: {...input.body, weight: _.toNumber(e.target.value)}})
                        }
                      }}
                      margin={`none`}
                    />
                  </Box>
                  <Box p={1} width={1 / 2}>
                    <TextInput
                      label={`Height`}
                      value={_.toString(input.body.height)}
                      onChange={e => {
                        if (!Number.isNaN(_.toNumber(e.target.value))) {
                          setInput({...input, body: {...input.body, height: _.toNumber(e.target.value)}})
                        }
                      }}
                      margin={`none`}
                    />
                  </Box>
                  <Box p={1} width={1 / 2}>
                    <TextInput
                      label={`Birthday`}
                      type={`date`}
                      onChange={e => {
                        setInput({...input, birthday: e.target.value})
                      }}
                      margin={`none`}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                  <Box p={1} width={1 / 2}>
                    <FormControl style={{width: '100%'}}>
                      <InputLabel shrink={true}>Gender</InputLabel>
                      <Select
                        native
                        value={input.gender}
                        onChange={e => setInput({...input, gender: e.target.value})}
                      >
                        <option value={`m`}>Male</option>
                        <option value={`f`}>Female</option>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box p={1} width={1 / 2}>
                    <TextInput
                      label={`Heartrate (BPM)`}
                      value={_.toString(input.body.heartrate)}
                      onChange={e => {
                        if (!Number.isNaN(_.toNumber(input.body.heartrate))) {
                          setInput({...input, body: {...input.body, heartrate: _.toNumber(e.target.value)}})
                        }
                      }}
                      margin={`none`}
                    />
                  </Box>
                  <Box p={1} width={1 / 2}>
                    <TextInput
                      label={`Fat`}
                      value={_.toString(input.body.fat)}
                      onChange={e => {
                        if (!Number.isNaN(_.toNumber(input.body.fat))) {
                          setInput({...input, body: {...input.body, fat: _.toNumber(e.target.value)}})
                        }
                      }}
                      margin={`none`}
                    />
                  </Box>
                </Flex>
                <Box py={2}>
                  <Flex alignItems={`center`}>
                    <Box>
                      <Checkbox
                        checked={input.diabetes}
                        onChange={e => setInput({...input, diabetes: e.target.checked})}
                        color="primary"
                      />
                    </Box>
                    <Text fontSize={16} px={1}>I have diabetes</Text>
                  </Flex>
                </Box>
                <Text pt={3} fontSize={20} fontWeight={500}>Blood pressure</Text>
                <Flex flexWrap={`wrap`}>
                  <Box p={1} width={1 / 2}>
                    <TextInput
                      label={`Systolic`}
                      value={_.toString(input.body.bloodPressure.high)}
                      onChange={e => {
                        if (!Number.isNaN(_.toNumber(input.body.bloodPressure.high))) {
                          setInput({...input, body: {...input.body, bloodPressure: {...input.body.bloodPressure, high: _.toNumber(e.target.value)}}})
                        }
                      }}
                      margin={`none`}
                    />
                  </Box>
                  <Box p={1} width={1 / 2}>
                    <TextInput
                      label={`Diastolic`}
                      value={_.toString(input.body.bloodPressure.low)}
                      onChange={e => {
                        if (!Number.isNaN(_.toNumber(input.body.bloodPressure.low))) {
                          setInput({...input, body: {...input.body, bloodPressure: {...input.body.bloodPressure, low: _.toNumber(e.target.value)}}})
                        }
                      }}
                      margin={`none`}
                    />
                  </Box>
                </Flex>
                <Text pt={3} fontSize={20} fontWeight={500}>Allergies</Text>
                <Flex py={2} flexWrap={`wrap`}>
                  {databaseAllergy.map(allergy => {
                    const isChecked = !_.isEmpty(_.intersection(input.allergies, [allergy.id]))

                    const toggleCheckbox = id => {
                      if (_.isEmpty(_.intersection(input.allergies, [allergy.id]))) {
                        // Add
                        setInput({...input, allergies: _.union(input.allergies, [id])})
                      } else {
                        setInput({...input, allergies: _.filter(input.allergies, o => o !== id)})
                      }
                    }

                    return (
                      <Box p={2} width={[1 / 2, 1 / 3, 1 / 4]}>
                        <Flex alignItems={`center`}>
                          <Box>
                            <Checkbox
                              checked={isChecked}
                              onChange={() => toggleCheckbox(allergy.id)}
                              color="primary"
                            />
                          </Box>
                          <Text fontSize={14} px={1}>{allergy.name}</Text>
                        </Flex>
                      </Box>
                    )
                  })}
                </Flex>
                <Box py={2}>
                  <Button variant="contained" color="primary" fullWidth={true} onClick={() => saveInput()}>
                    SAVE
                  </Button>
                </Box>
              </Box>
            ): (
              <Text fontSize={20} fontWeight={500}>Saved!</Text>
            )}
          </BorderedCard>
        </Box>
      </Box>
    </Flex>
  )
}

export default UserComponent
