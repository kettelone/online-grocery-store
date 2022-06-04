import React from 'react'
import { useState } from 'react'
import Modal from './modals/ItemModal'

const DeviceItem = ({ device }) => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <div className="productBox">
      {openModal && (
        <Modal
          device={device}
          setOpenModal={() => {
            setOpenModal(false)
          }}
        />
      )}
      <div className="productBox-list">
        <div
          className="productBox-listItem"
          onClick={() => {
            setOpenModal(true)
          }}
        >
          <div className="productTile-image">
            <span className="itemImage">
              <img
                src={process.env.REACT_APP_API_URL + device.img}
                alt={device.name}
                className="deviceItem-img"
              />
            </span>
            <div className="productTile-footer"></div>
          </div>
          <div className="productTile-details">
            <div className="productTile-price">{device.price}.00 грн</div>
            <div className="productItemInfo-wrapper">
              <span className="productItemInfo">{device.name}</span>
              <span className="productItemWeight">{device.weight}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeviceItem
