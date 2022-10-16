import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories'

export const makeRemoteAddAccount = (): RemoteAddAccount => {
  return new RemoteAddAccount(makeApiUrl('/login'), makeAxiosHttpClient())
}
