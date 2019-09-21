import React from 'react'

import GoogleMap from 'google-map-react'

import { IMapProps } from '../@types/IMapProps'

const MapComponent: React.FC<IMapProps> = props => {
  const {lat, lon} = props

  return (
    <GoogleMap
      bootstrapURLKeys={{key: 'AIzaSyBfm7UjWRAaifh3xs4Jrmgdjy_F8tbmxg8'}}
      defaultZoom={16}
      defaultCenter={{ lat: lat, lng: lon }}
    />
  )
}

export default MapComponent
