import { result } from '@/utils/axios'
import { User } from 'quboqin-lib/lib/user'
import { Address } from 'quboqin-lib/lib/address'

export function getUserByPhone<T>(params: T): Promise<User> {
  return result('get', '/users', params) as Promise<User>
}

export function getAllAddresses<T>(params: T): Promise<Address[]> {
  return result('get', '/addresses', params) as Promise<Address[]>
}

export function createUser<T, U>(params: T): Promise<U | void> {
  return result('post', '/users', params)
}

export function createAddress<T>(params: T): Promise<Address> {
  return result('post', '/addresses', params) as Promise<Address>
}

export function deleteAddress<T, U>(params: T): Promise<U | void> {
  return result('del', '/addresses', params)
}
