import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom' // можна динамически передвигатся по страницам
import { Context } from '../index'
import OrderConfirmation from '../components/modals/OrderConfirmation'
import axios from 'axios'
const telegramEndpoint = `https://api.telegram.org/bot${process.env.REACT_APP_TELEGRAM_TOKEN}`
const chatId = '508002761'

const CheckOut = () => {
  const navigate = useNavigate()
  const { basket } = useContext(Context)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('no email')
  const [disabled, setDisabled] = useState(true)

  const modalOpen = () => {
    let modal = document.querySelector('.confirmation-container-hidden')
    modal.classList.remove('confirmation-container-hidden')
    modal.classList.add('confirmation-container')
  }

  const modalClose = () => {
    let modal = document.querySelector('.confirmation-container')
    modal.classList.remove('confirmation-container')
    modal.classList.add('confirmation-container-hidden')
  }

  const handlePhone = (e) => {
    setPhone(e.target.value)
  }

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const basketEdit = () => {
    basket.setIsOpenBasket(true)
  }

  const saveInfo = () => {
    if (name && email && phone) {
      const element = document.querySelector('.order-button')
      setDisabled(false)
      element.classList.remove('disabled-order-btn')
    }
  }

  const placeOrder = async () => {
    try {
      let finalString = ''
      basket._basketContent.map((element) => {
        return (finalString +=
          `✅${element.name} - ${element.totalCount}шт - ${element.price}грн` +
          '\n')
      })
      const response = await axios.post(`${telegramEndpoint}/sendMessage`, {
        chat_id: chatId,
        parse_mode: 'HTML',
        text: `
       <b>Ім'я:</b> ${name}\n<b>Телефон:</b> ${phone}\n<b>Email:</b> ${email}\n<b>Замовив:</b>\n${finalString}`,
      })
      if (response.status === 200) {
        basket.setBasketContent([])
        basket.setBasketTotalAmount(0)
        basket.setBasketTotalItems(0)
        localStorage.setItem('basketTotalItems', 0)
        localStorage.setItem('basketTotalAmount', 0)
        localStorage.setItem('basket', JSON.stringify([]))
        modalOpen()
        setTimeout(() => {
          modalClose()
        }, 5000)
        setTimeout(() => {
          navigate('/')
        }, 6000)
      }
    } catch (e) {
      console.log(name)
    }
  }

  return (
    <div className="checkout-container">
      <OrderConfirmation />
      <div className="checkout-wrapper">
        <div className="contacts">
          <div className="contact-info">
            <div className="checkout-header">
              <div className="checkout-header-icon"></div>
              <div className="checkout-header-text">Контакти</div>
            </div>

            <div className="contact-info-wrapper">
              <div className="checkout-user-phone-number">
                <div className="checkout-user-phone">
                  Номер для зв’язку та SMS сповiщень
                </div>
                <input
                  onChange={handlePhone}
                  type="text"
                  className="phone-number-input"
                  placeholder="+380956428957"
                />
              </div>
              <div className="checkout-user-contacts-profile">
                <div className="checkout-user-contacts">
                  <div className="checkout-user-email-wrapper">
                    <div className="form-input-wrapper">
                      <label htmlFor="email" className="label-for">
                        Email для листування <span>*</span>
                      </label>
                      <div className="form-input">
                        <input
                          onChange={handleEmail}
                          placeholder="Ваша електронна пошта"
                          type="email"
                          name="email"
                          className="email-input"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="checkout-user-profile-name">
                    <div className="form-input-wrapper">
                      <label htmlFor="firstName" className="label-for">
                        Ім'я <span>*</span>
                      </label>
                      <div className="form-input">
                        <input
                          onChange={handleName}
                          placeholder="Ваше ім'я"
                          type="text"
                          name="firstName"
                          className="name-input"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="checkout-user-contacts-btn">
                <button className="save-customer-info-btn" onClick={saveInfo}>
                  Зберегти зміни
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-basket-preview">
          <div className="checkout-basket-container">
            <div className="basket-header">
              <div className="basket-header-title">
                <span className="basket-header-title-span">Кошик</span>
                {basket._basketTotalItems !== 0 ? (
                  <span className="checkout-availabel-count">
                    {basket._basketTotalItems}{' '}
                  </span>
                ) : (
                  ''
                )}
              </div>
              <div className="edit-button-wrapper">
                <button
                  className="checkout-edit-basket-btn"
                  onClick={basketEdit}
                >
                  Редагувати
                </button>
              </div>
            </div>
            <div className="checkout-item-info-wrapper">
              <div className="checkout-item-info">
                <span className="icon-iten-info"></span>
                <span className="item-text">Товари</span>
              </div>
              <div className="price-for-the-goods">
                {basket._basketTotalAmount}.00 грн
              </div>
            </div>
            <div className="total-amount-container">
              <span className="total-amount-text">Всього:</span>
              <span className="total-amount-number">
                {basket._basketTotalAmount}.00 грн
              </span>
            </div>
          </div>
          <div className="order-button-container">
            <button
              className="order-button disabled-order-btn"
              onClick={placeOrder}
              disabled={disabled}
            >
              Замовити
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOut
