import { result } from '@/utils/axios'

import { Card } from 'quboqin-lib/lib/card'

export function getAllCards<T>(params: T): Promise<Card[]> {
  return result('get', '/cards', params) as Promise<Card[]>
}

export function createCard<T>(params: T): Promise<Card> {
  return result('post', '/cards', params) as Promise<Card>
}

export function deleteCard<T, U>(params: T): Promise<U | void> {
  return result('del', '/cards', params)
}
