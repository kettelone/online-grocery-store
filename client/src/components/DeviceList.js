import React, { useContext } from 'react'
import { Context } from '../index'
import DeviceItem from './DeviceItem'
import { observer } from 'mobx-react-lite'

const DeviceList = observer(() => {
  const { device } = useContext(Context)
  return (
    <div className="deviceItems-container">
      {device.devices
        ? device.devices.map((device) => (
            <DeviceItem key={device.id} device={device} />
          ))
        : 'Немає товару'}
    </div>
  )
})

export default DeviceList
