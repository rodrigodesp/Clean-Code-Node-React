import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories'

export const makeRemoteAuthentication = (): RemoteAuthentication => {
  return new RemoteAuthentication(makeApiUrl(), makeAxiosHttpClient())
}
