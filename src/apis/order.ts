import { result } from '@/utils/axios'

import { Order } from 'quboqin-lib/lib/order'

export function payOrder<T, U>(params: T): Promise<U | void> {
  return result('post', '/orders', params)
}

export function getAllOrders<T>(params: T): Promise<Order[]> {
  return result('get', '/orders', params) as Promise<Order[]>
}
