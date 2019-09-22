import React from 'react'

import GoogleMap from 'google-map-react'

import { IMapProps } from '../@types/IMapProps'

const MapComponent: React.FC<IMapProps> = props => {
  const {lat, lon} = props

  const {GOOGLE_API = 'any'} = process.env

  return (
    <GoogleMap
      bootstrapURLKeys={{key: GOOGLE_API}}
      defaultZoom={16}
      defaultCenter={{ lat: lat, lng: lon }}
    />
  )
}

export default MapComponent
