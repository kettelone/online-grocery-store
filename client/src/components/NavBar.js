import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import Basket from './modals/BasketModal'
import { ADMIN_ROUTE, SHOP_ROUTE, LOGIN_ROUTE } from '../utils/consts'
import cart from '../assets/cart.ico' // with import
import exitDoor from '../assets/doorExit.svg'
import userIcon from '../assets/user.svg'
import cogwheel from '../assets/cogwheel.svg'
import menu from '../assets/menu.svg'

const NavBar = observer(() => {
  const { user, basket, device } = useContext(Context)
  const navigate = useNavigate()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.removeItem('token')
    navigate('/')
  }

  const openBasket = () => {
    basket.setIsOpenBasket(true)
  }

  const handleBuyProducts = () => {
    device.setSelectedType({})
    device.setSelectedSubType({})
    device.setSelectedBrand({})
    device.setTypeBrands([])
    console.log('brands are: ', device.brands)
  }

  return (
    <div className="nav-bar">
      <div className="nav-logo-wrapper">
        <div className="nav-logo">Чесний Магазин</div>
      </div>
      <div className="navbar-container">
        {basket._isOpenBasket && <Basket />}
        <NavLink
          className="nav-buy-btn"
          to={SHOP_ROUTE}
          onClick={() => handleBuyProducts()}
        >
          <span>
            <img src={menu} alt="menu" width="24px" />
          </span>
          <span> Купити товари</span>
        </NavLink>
        {user.isAuth && jwt_decode(localStorage.token).role === 'ADMIN' ? (
          <div className="nav-bar-right-panel" style={{ color: 'white' }}>
            <Button
              className="nav-bar-button"
              onClick={() => {
                navigate(ADMIN_ROUTE)
              }}
            >
              <span>
                <img src={cogwheel} alt="cogwheel" width="24px" />
              </span>
              <span>Панель адміністратора</span>
            </Button>
            <Button
              className="ml-2 nav-bar-button"
              onClick={() => {
                openBasket()
              }}
            >
              <div className="cart-img-container">
                <span>
                  <img src={cart} alt="cart" />
                </span>
                <span className="cart-badge">
                  {' '}
                  {basket.BasketTotalItems !== 0 ? basket.BasketTotalItems : ''}
                </span>
              </div>
              Кошик{' '}
            </Button>
            <Button className="ml-2 nav-bar-button" onClick={() => logOut()}>
              <span>
                <img src={exitDoor} alt="exitDoor" width="24px" />
              </span>
              <span>Вийти</span>
            </Button>
          </div>
        ) : user.isAuth && jwt_decode(localStorage.token).role === 'USER' ? (
          <div className="nav-bar-right-panel" style={{ color: 'white' }}>
            <Button
              className="ml-2 nav-bar-button"
              onClick={() => {
                openBasket()
              }}
            >
              <div className="cart-img-container">
                <span>
                  <img src={cart} alt="cart" />
                </span>
                <span className="cart-badge">
                  {' '}
                  {basket.BasketTotalItems !== 0 ? basket.BasketTotalItems : ''}
                </span>
              </div>
              Кошик{' '}
            </Button>
            <Button className="ml-2 nav-bar-button" onClick={() => logOut()}>
              <span>
                <img src={exitDoor} alt="exitDoor" width="24px" />
              </span>
              <span>Вийти</span>
            </Button>
          </div>
        ) : (
          <div className="nav-bar-right-panel" style={{ color: 'white' }}>
            <Button
              className="ml-2 nav-bar-button"
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              <span>
                <img src={userIcon} alt="userIcon" width="24px" />
              </span>
              <span>Авторизація</span>
            </Button>
            <Button
              className="ml-2 nav-bar-button"
              onClick={() => {
                openBasket()
              }}
            >
              <div className="cart-img-container">
                <span>
                  <img src={cart} alt="cart" />
                </span>
                <span className="cart-badge">
                  {' '}
                  {basket.BasketTotalItems !== 0 ? basket.BasketTotalItems : ''}
                </span>
              </div>
              Кошик{' '}
            </Button>
          </div>
        )}
      </div>
      <div className="basket-container">
        {basket._isOpenBasket && <Basket />}
      </div>
    </div>
  )
})

export default NavBar
