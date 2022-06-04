import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'
import CreateType from '../components/modals/CreateType'
import CreateSubType from '../components/modals/CreateSubType'
import EditDevice from '../components/modals/EditDevice'

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  const [deviceVisible, setDeviceVisible] = useState(false)
  const [subtypeVisible, setSubtypeVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)

  return (
    <Container className="d-flex flex-column admin-container">
      <Button
        variant={'outline-dark'}
        className="mt-4 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Додати тип товару
      </Button>
      <Button
        variant={'outline-dark'}
        className="mt-4 p-2"
        onClick={() => setSubtypeVisible(true)}
      >
        Додати підтип товару
      </Button>
      <Button
        variant={'outline-dark'}
        className="mt-4 p-2"
        onClick={() => setBrandVisible(true)}
      >
        Додати бренд
      </Button>
      <Button
        variant={'outline-dark'}
        className="mt-4 p-2"
        onClick={() => setDeviceVisible(true)}
      >
        Додати товар
      </Button>
      <Button
        variant={'outline-dark'}
        className="mt-4 p-2"
        onClick={() => setEditVisible(true)}
      >
        Редагувати товар
      </Button>

      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateSubType
        show={subtypeVisible}
        onHide={() => setSubtypeVisible(false)}
      />
      <EditDevice show={editVisible} onHide={() => setEditVisible(false)} />
    </Container>
  )
}

export default Admin
