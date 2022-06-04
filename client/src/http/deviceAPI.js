import { $authHost, $host } from './index'

export const createType = async (type) => {
  const { data } = await $authHost.post('api/type', type)
  return data
}

export const fetchTypes = async () => {
  const { data } = await $host.get('api/type')
  return data
}

export const createSubType = async (subtype) => {
  const { data } = await $authHost.post('api/subtype', subtype)
  return data
}

export const fetchSubTypes = async () => {
  const { data } = await $host.get('api/subtype')
  return data
}

export const createBrand = async (brand) => {
  const { data } = await $authHost.post('api/brand', brand)
  return data
}

export const fetchBrands = async () => {
  const { data } = await $host.get('api/brand')
  return data
}

export const createDevice = async (device) => {
  const { data } = await $authHost.post('api/device', device)
  return data
}

export const fetchDevices = async (
  typeId,
  subtypeId,
  brandId,
  page,
  limit = 5
) => {
  const { data } = await $host.get('api/device', {
    params: {
      subtypeId,
      typeId,
      brandId,
      page,
      limit,
    },
  })
  return data
}

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get('api/device/' + id)
  return data
}

export const editDevice = async ({ id, price }) => {
  const { data } = await $host.put('api/device/', {
    params: {
      id,
      price,
    },
  })
  return data
}
