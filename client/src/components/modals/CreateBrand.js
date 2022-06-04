import React, { useState, useContext, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Form, Dropdown } from 'react-bootstrap'
import { createBrand, fetchTypes } from '../../http/deviceAPI'
import { Context } from '../../index'

const CreateBrand = ({ show, onHide }) => {
  const { device } = useContext(Context)
  const [value, setValue] = useState('')

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data))
  }, [])

  const addBrand = () => {
    createBrand({ name: value, typeId: device.selectedType.id }).then(
      (data) => {
        setValue('')
        onHide()
      }
    )
  }
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Додати виробника
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedType.name || 'Оберіть тип'}
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
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={'Введіть назву виробника товару'}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрити
        </Button>
        <Button variant="outline-success" onClick={addBrand}>
          Додати
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateBrand
