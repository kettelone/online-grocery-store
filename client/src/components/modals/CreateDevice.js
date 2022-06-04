import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Dropdown, Form, Row, Col } from 'react-bootstrap'
import { Context } from '../../index'
import {
  createDevice,
  fetchBrands,
  fetchTypes,
  fetchSubTypes,
} from '../../http/deviceAPI'
import { observer } from 'mobx-react-lite'

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context)
  const [name, setName] = useState('')
  const [price, setPrice] = useState()
  const [weight, setWeight] = useState('')
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data))
    fetchSubTypes().then((data) => device.setSubTypes(data))
    fetchBrands().then((data) => device.setBrands(data))
  }, [])

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number))
  }
  const changeInfo = (key, value, number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)))
  }

  const selectFile = (e) => {
    setFile(e.target.files[0])
  }

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('weight', weight)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('subtypeId', device.selectedSubType.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then((data) => onHide())
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Додати товари
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
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Введіть назву товару"
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Введіть вартість"
            type="number"
          />
          <Form.Control
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-3"
            placeholder="Введіть вагу товару"
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />
          <Button variant={'outline-dark'} onClick={addInfo}>
            Додати нову характеристику
          </Button>
          {info.map((i) => (
            <Row className="mt-4" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) =>
                    changeInfo('title', e.target.value, i.number)
                  }
                  placeholder="Введіть назву характеристики"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) =>
                    changeInfo('description', e.target.value, i.number)
                  }
                  placeholder="Введіть опис характеристики"
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeInfo(i.number)}
                  variant={'outline-danger'}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateDevice
