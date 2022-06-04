import { $authHost, $host } from './index'

export const addDevice = async (device) => {
  const { name, amount, price, id } = device
  const { data } = await $host.post('api/basket/', {
    params: {
      name,
      amount,
      price,
      id,
    },
  })
  return data
}
