import React, { useContext, useEffect, useState } from 'react'
import { Modal, Form, Dropdown, Button } from 'react-bootstrap'
import { Context } from '../../index'
import {
  fetchBrands,
  fetchTypes,
  fetchSubTypes,
  fetchDevices,
  editDevice,
} from '../../http/deviceAPI'
import { observer } from 'mobx-react-lite'

const EditDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context)
  const [price, setPrice] = useState()

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data))
    fetchSubTypes().then((data) => device.setSubTypes(data))
    fetchBrands().then((data) => device.setBrands(data))
    fetchDevices(
      device.selectedType.id,
      device.selectedSubType.id,
      device.selectedBrand.id,
      device.page,
      8
    ).then((data) => {
      device.setDevices(data.rows)
    })
  }, [])

  const updateDevice = ({ id, price }) => {
    editDevice({ id, price })
    device.setSelectedType({})
    device.setSelectedSubType({})
    device.setSelectedBrand({})
    device.setSelectedDevice({})
    setPrice(0)
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Редагувати товари
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedType.name || 'Обрати тип'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedSubType.name || 'Обрати підтип'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.subtypes.map((subtype) =>
                device.selectedType.id === subtype.typeId ? (
                  <Dropdown.Item
                    onClick={() => device.setSelectedSubType(subtype)}
                    key={subtype.id}
                  >
                    {subtype.name}
                  </Dropdown.Item>
                ) : (
                  ''
                )
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedBrand.name || 'Обрати виробника'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedDevice.name || 'Обрати товар'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.devices.map((item) =>
                device.selectedSubType.id === item.subtypeId &&
                device.selectedBrand.id === item.brandId ? (
                  <Dropdown.Item
                    onClick={() => device.setSelectedDevice(item)}
                    key={item.id}
                  >
                    {item.name}
                  </Dropdown.Item>
                ) : (
                  ''
                )
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Введіть вартість"
            type="number"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button
          variant="outline-success"
          onClick={() => updateDevice({ id: device.selectedDevice.id, price })}
        >
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default EditDevice
