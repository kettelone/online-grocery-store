import { makeAutoObservable } from 'mobx'

export default class BasketStore {
  constructor() {
    this._basketContent = []
    this._isOpenBasket = false
    this._basketTotalAmount = 0
    this._basketTotalItems = 0
    makeAutoObservable(this)
  }

  setBasketContent(item) {
    this._basketContent = item
  }

  setIsOpenBasket(bool) {
    this._isOpenBasket = bool
  }

  setBasketTotalAmount(amount) {
    this._basketTotalAmount = amount
  }

  setBasketTotalItems(items) {
    this._basketTotalItems = items
  }

  get BasketContent() {
    return this._basketContent
  }

  get IsOpenBasket() {
    return this._isOpenBasket
  }

  get BasketTotalAmount() {
    return this._basketTotalAmount
  }

  get BasketTotalItems() {
    return this._basketTotalItems
  }
}
