<template>
  <Header title="登入或注册"></Header>
  <div class="mt-14">
    <van-tabs v-model:active="active" background="#fee2e2">
      <van-tab
        v-for="(item, index) in ['手机', '邮箱']"
        :title="item"
        :key="index"
      >
        <div class="container mx-auto p-4">
          <van-cell-group>
            <van-field
              v-if="item === '手机'"
              v-model="phone"
              type="tel"
              :label="item"
            />
            <van-field v-else v-model="email" type="email" :label="item" />
            <van-field v-model="firstName" type="text" label="First Name" />
            <van-field v-model="lastName" type="text" label="Last Name" />
            <van-field v-model="code" type="digit" label="验证码">
              <template v-slot:button>
                <van-button
                  round
                  type="danger"
                  size="mini"
                  @click="onSignIn"
                  v-if="!disabled"
                  >获取验证码</van-button
                >
                <van-button
                  disabled
                  round
                  type="danger"
                  size="mini"
                  @click="onSignIn"
                  v-else
                  >获取验证码( {{ count }}s)</van-button
                >
              </template>
            </van-field>
          </van-cell-group>
        </div>
      </van-tab>
    </van-tabs>

    <div class="mx-4 mt-4">
      <van-button
        round
        type="success"
        size="large"
        @click="onSubmitOTP"
        v-if="disabled"
        >立即登录</van-button
      >
      <van-button
        disabled
        round
        type="success"
        size="large"
        @click="onSubmitOTP"
        v-else
        >立即登录</van-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import Header from '@/components/HeaderWithBack.vue'

import { createUser } from '@/apis/user'
import { userAuthInject } from '@/store/user'
import { signIn, sendCustomChallengeAnswer } from '@/utils/aws-auth'
import { User } from 'quboqin-lib/lib/user'

export default defineComponent({
  name: 'Sign',
  components: {
    Header,
  },
  setup() {
    const router = useRouter()
    const { userInfo, setCognitoUser, setUser } = userAuthInject()

    const maxCount = 120

    const state = reactive({
      phone: userInfo.profile?.phone ?? '+13233013227',
      firstName: userInfo.profile?.firstName ?? 'Qubo',
      lastName: userInfo.profile?.lastName ?? 'Qin',
      email: userInfo.profile?.email,
      code: '',
      active: 0,
      disabled: false,
      count: maxCount,
    })

    async function onSignIn(): Promise<void> {
      try {
        const cognitoUser = await signIn(
          state.phone,
          true,
          state.firstName,
          state.lastName,
        )

        state.disabled = true
        const limitedInterval = setInterval(() => {
          state.count--
          if (state.count === 0) {
            state.disabled = false
            clearInterval(limitedInterval)
            state.count = maxCount
          }
        }, 1000)

        setCognitoUser(cognitoUser)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error.message)
      }
      console.log(`onSignIn - setCognitoUser`)
    }

    // function onReset(): void {
    //   state.phone = ''
    //   state.firstName = ''
    //   state.lastName = ''
    //   console.log(`onReset`)
    // }

    async function onSubmitOTP(): Promise<void> {
      let cognitoUser = userInfo.cognitoUser
      if (cognitoUser) {
        try {
          await sendCustomChallengeAnswer(cognitoUser, state.code)

          const user = new User()
          user.phone = state.phone ? state.phone : ''
          user.firstName = state.firstName ? state.firstName : ''
          user.lastName = state.lastName ? state.lastName : ''
          await createUser(user)

          setUser(user)
          router.push({
            path: '/profile',
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          if (error.code === 'UserLambdaValidationException') {
            cognitoUser = await signIn(
              cognitoUser.getUsername(),
              true,
              state.firstName,
              state.lastName,
            )
            if (cognitoUser) {
              setCognitoUser(cognitoUser)
            }
          }
        }
      }
      console.log(`onSubmit`)
    }

    return {
      ...toRefs(state),
      onSignIn,
      onSubmitOTP,
    }
  },
})
</script>
