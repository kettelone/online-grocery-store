import React, { useEffect, useState } from 'react'
import { Container, Col, Image, Row, Button, Card } from 'react-bootstrap'
//justify-content - по вертикали
//align items - по  горизонтали
import { useParams } from 'react-router-dom'
import { fetchOneDevice } from '../http/deviceAPI'
const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] })
  const { id } = useParams()

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data))
  }, [])
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={150}
            height={150}
            src={process.env.REACT_APP_API_URL + device.img}
          />
        </Col>
        <Col md={4}>
          <h2>{device.name}</h2>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: '5px solid lightgray',
            }}
          >
            <h3>От: {device.price} грн.</h3>
            <Button variant={'outline-dark'}>Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-colum m-3">
        <h1>Характеристики</h1>
        {device.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? 'lightgray' : 'transparent',
              padding: 10,
            }}
          >
            {info.title} : {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  )
}

export default DevicePage
