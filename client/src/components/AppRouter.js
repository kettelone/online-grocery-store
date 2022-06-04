import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import Shop from '../pages/Shop'
import { Context } from '../index'

const AppRouter = () => {
  //мы указываем несеолько маршрутов, например страница
  // страница авторизации, регистрации и магазина
  //если ни один из маршрутов не отработал(например пользователь ввел не корректный маршрут),
  //то отработает самый последний маршрут внутри Switch
  const { user } = useContext(Context)

  // console.log(user)
  return (
    //In react-router-dom v6, "Switch" is replaced by routes "Routes"
    /*
    You also need to update the Route declaration 
        from
        <Route path="/" component={Home} />
        to
        <Route path='/welcome' element={<Home/>} /> 

    In react-router-dom, you also do not need to use the exact in the Route declaration.
    */

    /* 
        For react-router-dom v6, 
        simply replace Redirect with Navigate
    */

    <Routes>
      {user.isAuth === true &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Shop />} />
    </Routes>
  )
}

export default AppRouter
