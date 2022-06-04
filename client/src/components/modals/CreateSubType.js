import React, { useState, useEffect, useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Form, Button, Dropdown } from 'react-bootstrap'
import { createSubType, fetchTypes } from '../../http/deviceAPI'
import { Context } from '../../index'

const CreateSubType = ({ show, onHide }) => {
  const { device } = useContext(Context)
  const [value, setValue] = useState('')

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data))
  }, [])

  const addSubType = () => {
    createSubType({ name: value, typeId: device.selectedType.id }).then(
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
          Додати підтип
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
            placeholder={'Введіть назву підтипу товару(наприклад: сосиски)'}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addSubType}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateSubType
