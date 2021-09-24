import { result } from '@/utils/axios'

export function checkHealth<U>(): Promise<U | void> {
  return result('get', '/checkHealth')
}
