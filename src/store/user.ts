import { provide, inject, reactive } from 'vue'

import { User } from 'quboqin-lib/lib/user'
import { Item } from 'quboqin-lib/lib/item'

export type Profile = User

export interface UserInfo {
  profile?: Profile
  cart?: {
    items?: Item[]
    totalPrice: number
    tax?: number
    tips?: number
    deliverFee?: number
    deliverDate?: string
  }
}

type UserInfoContext = {
  userInfo: UserInfo
  setUser: (newProfile?: Profile) => void
  addItem: (newItem: Item) => void
  removeItem: (index: number) => void
}

const UserAuthSymbol = Symbol()

export const userAuthProvide: (newUserInfo: UserInfo) => void = (
  newUserInfo,
) => {
  function updateTotalPrice() {
    let price = 0.0
    userInfo.cart?.items?.forEach((item) => {
      price += (item.amount ?? 0) * (item.price ?? 0)
    })
    if (userInfo.cart) {
      userInfo.cart.totalPrice = price
    }
  }

  const userInfo = reactive<UserInfo>(newUserInfo)

  const setUser = (newProfile: Profile) => {
    Object.assign(userInfo.profile, newProfile)
  }

  const addItem = (newItem: Item) => {
    userInfo.cart?.items?.push(newItem)
    updateTotalPrice()
  }

  const removeItem = (index: number) => {
    userInfo.cart?.items?.splice(index, 1)
    updateTotalPrice()
  }

  provide(UserAuthSymbol, {
    userInfo,
    setUser,
    addItem,
    removeItem,
  })
}

export const userAuthInject: () => UserInfoContext = () => {
  const userAuthContext = inject<UserInfoContext>(UserAuthSymbol)

  if (!userAuthContext) {
    throw new Error(`userAuthInject must be used after userAuthProvide`)
  }

  return userAuthContext
}
