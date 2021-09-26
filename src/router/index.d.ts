import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    index?: number
    requiresAuth?: boolean
  }
}
