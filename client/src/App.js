//axios - для отрравки запросов на сервер
// react-router-dom - для постраничной навигации
//mobx - state manager
// mobx-react-lite - для того, чтобы связать mobx с функциональными компонентами react

import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { observer } from 'mobx-react-lite'
import { Context } from './index'
import { check } from './http/userAPI'
import { Spinner } from 'react-bootstrap'
import './index.css'

const App = observer(() => {
  const { user, basket } = useContext(Context)
  const [loading, setLoading] = useState(true)

  const b = 0
  useEffect(() => {
    basket.setBasketContent(JSON.parse(localStorage.getItem('basket')))
    basket.setBasketTotalAmount(
      parseInt(JSON.parse(localStorage.getItem('basketTotalAmount')))
    )
    basket.setBasketTotalItems(
      JSON.parse(localStorage.getItem('basketTotalItems'))
    )
    check()
      .then((data) => {
        user.setUser(true)
        user.setIsAuth(true)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation={'grow'} />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  )
})

export default App
