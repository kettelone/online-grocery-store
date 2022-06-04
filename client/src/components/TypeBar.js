import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import meat from '../assets/typeBarIcons/meat.svg'
import cheese from '../assets/typeBarIcons/cheese.svg'
import milk from '../assets/typeBarIcons/milk.svg'
import frozen from '../assets/typeBarIcons/frozen.svg'
import dumpling from '../assets/typeBarIcons/dumpling.svg'
import eggs from '../assets/typeBarIcons/eggs.svg'
import drinks from '../assets/typeBarIcons/drinks.svg'
import coffee from '../assets/typeBarIcons/coffee.svg'
import bakalia from '../assets/typeBarIcons/bakalia.svg'
import snacks from '../assets/typeBarIcons/snacks.svg'

const TypeBar = observer(() => {
  const { device } = useContext(Context)
  const icons = [
    meat,
    cheese,
    milk,
    frozen,
    dumpling,
    eggs,
    drinks,
    coffee,
    snacks,
    bakalia,
  ]
  let subClicked = false

  const makeVisible = (type) => {
    const node = document.querySelector(`.type${type.id}`).parentNode
    node.style.display = 'block'
    node.parentNode.style.background = 'rgb(231, 230, 230)'
  }

  const makeInvisible = (type) => {
    const node = document.querySelector(`.type${type.id}`).parentNode
    node.style.display = 'none'
    node.parentNode.style.background = 'white'
  }

  const typeClicked = (type) => {
    if (subClicked === false) {
      device.setSelectedSubType({})
      device.setSelectedBrand({})
      device.setSelectedType(type)
    } else {
      device.setSelectedType({})
    }
  }

  const subtypeClicked = (subtype, type) => {
    subClicked = true
    device.setSelectedBrand({})
    device.setSelectedSubType(subtype)
    // const typeBrands = device.brands.filter((brand) => brand.typeId === type.id)
    // device.setTypeBrands(typeBrands)
    makeInvisible(type)
  }

  const handleMouseOver = (type) => {
    makeVisible(type)
  }

  const handleMouseOut = (type) => {
    makeInvisible(type)
  }

  return (
    <div className="typeBar-wrapper">
      {device.types.map((type) => (
        <div
          className="main-type-bar"
          active={type.id === device.selectedType.id}
          onClick={() => typeClicked(type)}
          onMouseEnter={() => handleMouseOver(type)}
          onMouseLeave={() => handleMouseOut(type)}
          key={type.id}
        >
          <div className="types-wrapper">
            <span className="type-name-icon-wrapper">
              <span className="type-icon">
                <img src={icons[type.id - 1]} alt="bread" />
              </span>
              <span className="type-name">{type.name}</span>
            </span>
            <span className="arrow">{'>'}</span>
            <div className="subtypes">
              {device.subtypes.map((subtype) =>
                subtype.typeId === type.id ? (
                  <div
                    className={`subtype type${type.id}`}
                    key={subtype.name}
                    onClick={() => subtypeClicked(subtype, type)}
                  >
                    {subtype.name}
                  </div>
                ) : (
                  ''
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
})

export default TypeBar
