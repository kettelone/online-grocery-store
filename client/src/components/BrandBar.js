import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'

import menuIcon from '../assets/menu-icon.png'

const BrandBar = observer(() => {
  const { device } = useContext(Context)
  let [brandOpen, setBrandOpen] = useState(false)

  const clickHandler = (brand) => {
    device.setSelectedBrand(brand)
  }

  const handleBrandBar = () => {
    if (brandOpen === false) {
      const brandsBar = document.querySelector('.brands-container-hidden')
      brandsBar.classList.remove('brands-container-hidden')
      brandsBar.classList.add('brands-container')
      setBrandOpen(true)
    } else {
      const brandsBar = document.querySelector('.brands-container')
      brandsBar.classList.remove('brands-container')
      brandsBar.classList.add('brands-container-hidden')
      setBrandOpen(false)
    }
  }

  return (
    <div className="brands-container-wrapper">
      <div className="brandBarButton-wrapper">
        <button className="brandBarButton" onClick={handleBrandBar}>
          <span className="brand-menu-icon">
            <img
              src={menuIcon}
              alt="brandMenu"
              className="brandMenu-img"
              height="14px"
            />
          </span>
          <span className="chooseBrand">Обрати виробника</span>
        </button>
      </div>
      <div className="brands-container-hidden">
        {device.typeBrands.length === 0
          ? device.brands.map((brand) => (
              <div
                key={brand.id}
                className="brand"
                style={{ cursor: 'pointer' }}
                onClick={() => clickHandler(brand)}
                border={
                  brand.id === device.selectedBrand.id ? 'danger' : 'light'
                }
              >
                {brand.name}
              </div>
            ))
          : device.typeBrands.map((brand) => (
              <div
                key={brand.id}
                className="brand"
                style={{ cursor: 'pointer' }}
                onClick={() => clickHandler(brand)}
                border={
                  brand.id === device.selectedBrand.id ? 'danger' : 'light'
                }
              >
                {brand.name}
              </div>
            ))}
      </div>
    </div>
  )
})

export default BrandBar
