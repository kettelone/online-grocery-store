import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
  constructor() {
    this._types = []
    this._subtypes = []
    this._brands = []
    this._typeBrands = []
    this._devices = []
    this._selectedType = {}
    this._selectedBrand = {}
    this._selectedSubType = {}
    this._selectedDevice = {}
    this._page = 1
    this._totalCount = 0
    this._limit = 3
    makeAutoObservable(this)
  }

  setTypes(types) {
    this._types = types
  }
  setSubTypes(subtypes) {
    this._subtypes = subtypes
  }

  setBrands(brands) {
    this._brands = brands
  }

  setTypeBrands(typeBrands) {
    this._typeBrands = typeBrands
  }

  setDevices(devices) {
    this._devices = devices
  }

  setSelectedType(type) {
    this.setPage(1)
    this._selectedType = type
  }
  setSelectedSubType(subtype) {
    this.setPage(1)
    this._selectedSubType = subtype
  }
  setSelectedBrand(brand) {
    this.setPage(1)
    this._selectedBrand = brand
  }
  setSelectedDevice(device) {
    this._selectedDevice = device
  }
  setPage(page) {
    this._page = page
  }
  setTotalCount(count) {
    this._totalCount = count
  }

  get types() {
    return this._types
  }

  get subtypes() {
    return this._subtypes
  }

  get typeBrands() {
    return this._typeBrands
  }
  get brands() {
    return this._brands
  }
  get devices() {
    return this._devices
  }
  get selectedType() {
    return this._selectedType
  }
  get selectedSubType() {
    return this._selectedSubType
  }
  get selectedBrand() {
    return this._selectedBrand
  }

  get selectedDevice() {
    return this._selectedDevice
  }
  get totalCount() {
    return this._totalCount
  }
  get page() {
    return this._page
  }
  get limit() {
    return this._limit
  }
}
