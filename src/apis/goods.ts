import { result } from '@/utils/axios'

import { Good } from 'quboqin-lib/lib/goods'

// import goods from '@/mock/goods.json'

export function getAllGoods(): Promise<Good[] | void> {
  // return result('get', '/goods', null, goods as Good[])
  return result('get', '/goods', null)
}
