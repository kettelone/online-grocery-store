import React, { useContext, useState } from 'react'
import './Modal.css'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'

const Modal = observer(({ setOpenModal, device }) => {
  const { basket } = useContext(Context)
  let newItem = true

  const addToBasket = ({ name, price, img }) => {
    const prevContent = basket._basketContent
    for (let i = 0; i < prevContent.length; i++) {
      if (prevContent[i].name === name) {
        prevContent[i].totalCount += 1
        newItem = false
        break
      }
    }

    const totalAmount = basket._basketTotalAmount + price
    if (newItem) {
      const totalItems = basket._basketTotalItems + 1
      basket.setBasketTotalItems(totalItems)
      localStorage.setItem('basketTotalItems', totalItems)
      prevContent.push({ name, price, img, totalCount: 1 })
    }
    basket.setBasketTotalAmount(totalAmount)
    localStorage.setItem('basketTotalAmount', totalAmount)
    basket.setBasketContent(prevContent)
    localStorage.setItem('basket', JSON.stringify(prevContent))

    setTimeout(() => {
      setOpenModal()
    }, 750)
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={setOpenModal}>X</button>
        </div>
        <div className="item-wrapper">
          <div className="item-img">
            <img
              src={process.env.REACT_APP_API_URL + device.img}
              alt="device-img"
              style={{ maxWidth: '330px' }}
            />
          </div>
          <div className="item-info">
            <h1 className="item-name">{device.name}</h1>
            <p className="item-price">{device.price}.00 грн</p>
            <div className="button-wrapper">
              <button
                className="addToBasket"
                onClick={() => addToBasket(device)}
              >
                Зберегти до кошика
              </button>
            </div>
            <div className="item-comments">
              <p className="item-comment-label">Коментар для збирача</p>
              <textarea
                name="item-commet-body"
                id="item-comment-body"
                placeholder="Тут можна можна написати збирачу свої побажання до товару
               "
              ></textarea>
            </div>
          </div>
        </div>
        <div className="footer">
          Незважаючи на те, що ми докладаємо всіх зусиль, щоб вся інформація про
          продукти була актуальною і правильною, фото товару і опис товару,
          представлені на сайті, можуть відрізнятися від товару в торговому
          залі. Для отримання більш точної інформації завжди звертайте увагу на
          реальний товар, читайте етикетку на продукті і не покладайтеся лише на
          інформацію, представлену на нашому сайті. Якщо необхідна більш
          детальна інформація про товар, будь ласка, зв'яжіться з виробником.
          {/* <button onClick={setOpenModal} id="cancelBtn">
            Відміна
          </button>
          <button>Продовжити</button> */}
        </div>
      </div>
    </div>
  )
})

export default Modal
