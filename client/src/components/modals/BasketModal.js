import React, { useContext } from 'react'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom' // можна динамически передвигатся по страницам
import { CHECKOUT_ROUTE, LOGIN_ROUTE } from '../../utils/consts'

const Basket = observer(() => {
  const navigate = useNavigate()
  const { basket, user } = useContext(Context)

  const closeBasket = () => {
    basket.setIsOpenBasket(false)
  }

  const deleteItem = (e) => {
    const newState = basket.BasketContent.filter(
      (item) => item.name !== e.target.dataset.name
    )
    basket.setBasketContent(newState)
    localStorage.setItem('basket', JSON.stringify(newState))

    let totalAmount = 0
    for (let i = 0; i < newState.length; i++) {
      totalAmount += newState[i].price * newState[i].totalCount
    }
    basket.setBasketTotalAmount(totalAmount)
    localStorage.setItem('basketTotalAmount', totalAmount)

    let totalItems = basket._basketTotalItems - 1
    basket.setBasketTotalItems(totalItems)
    localStorage.setItem('basketTotalItems', totalItems)
  }

  const addItem = (e) => {
    const selectedItem = e.target.dataset.name
    const prevContent = basket._basketContent
    let totalAmount = 0

    for (let i = 0; i < prevContent.length; i++) {
      if (prevContent[i].name === selectedItem) {
        prevContent[i].totalCount += 1
        totalAmount = basket._basketTotalAmount + prevContent[i].price
        break
      }
    }

    basket.setBasketTotalAmount(totalAmount)
    localStorage.setItem('basketTotalAmount', totalAmount)
    basket.setBasketContent(prevContent)
    localStorage.setItem('basket', JSON.stringify(prevContent))
  }
  const removetItem = (e) => {
    const selectedItem = e.target.dataset.name
    const prevContent = basket._basketContent
    let totalAmount = 0
    for (let i = 0; i < prevContent.length; i++) {
      if (prevContent[i].name === selectedItem) {
        prevContent[i].totalCount -= 1
        totalAmount = basket._basketTotalAmount - prevContent[i].price
        break
      }
    }
    basket.setBasketTotalAmount(totalAmount)
    localStorage.setItem('basketTotalAmount', totalAmount)
    basket.setBasketContent(prevContent)
    localStorage.setItem('basket', JSON.stringify(prevContent))
  }

  const checkOut = () => {
    basket.setIsOpenBasket(false)
    if (user.isAuth === true) {
      navigate(CHECKOUT_ROUTE)
    } else {
      navigate(LOGIN_ROUTE)
    }
  }

  return (
    <div className="container">
      <div className="modalBackground">
        <div className="basketModalContainer">
          <div className="basketTitleCloseBtn">
            <div className="basket-title">Кошик</div>
            <button onClick={closeBasket}>X</button>
          </div>
          {basket._basketTotalAmount === 0 && (
            <div style={{ textAlign: 'center', padding: '10px' }}>
              Ваш кошик пустий
            </div>
          )}
          {basket.BasketContent.map((item) => (
            <div className="item-info-container" key={uuidv4()}>
              <div className="item-info-wrapper">
                <div className="img-name-container">
                  <div className="basket-img-container">
                    <img
                      src={process.env.REACT_APP_API_URL + item.img}
                      alt="device-img"
                    />
                  </div>
                  <div className="basket-item-name-container">{item.name}</div>
                </div>
                <div className="div"></div>
                <div className="item-count-wrapper">
                  {item.totalCount >= 2 ? (
                    <button
                      className="basket-item-control-btn subtract-btn"
                      data-name={item.name}
                      onClick={removetItem}
                    >
                      -
                    </button>
                  ) : (
                    <button
                      className="basket-item-control-btn delete-btn"
                      data-name={item.name}
                      onClick={deleteItem}
                    >
                      x
                    </button>
                  )}
                  <div className="item-totalCount">{item.totalCount} шт</div>
                  <button
                    className="basket-item-control-btn add-btn"
                    data-name={item.name}
                    onClick={addItem}
                  >
                    +
                  </button>
                </div>
                <div className="price-delete-btn-wrapper">
                  <div className="basket-item-price-container">
                    {item.price}.00 грн
                  </div>
                  <div className="delete-btn-wrapper">
                    <button
                      data-name={item.name}
                      style={{ border: 'none', backgroundColor: 'transparent' }}
                      onClick={deleteItem}
                    >
                      x
                    </button>
                  </div>
                </div>
              </div>
              <hr className="hr" />
            </div>
          ))}
          <div className="basket-modal-footer">
            {basket._basketTotalAmount === 0 ? (
              <div className="checkout-btn-wrapper">
                <button className="checkout-btn" onClick={closeBasket}>
                  Перейти до покупок
                </button>
              </div>
            ) : (
              <div className="checkout-btn-wrapper">
                <button className="checkout-btn" onClick={checkOut}>
                  Оформити
                </button>
              </div>
            )}
            Всього: {basket._basketTotalAmount}.00 грн
          </div>
        </div>
      </div>
    </div>
  )
})

export default Basket
