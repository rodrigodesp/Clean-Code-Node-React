import {
  HttpPostClient,
  HttpPostParams
} from '@/data/protocols/http/http-post-client'
import {
  HttpResponse,
  HttpStatusCode
} from '@/data/protocols/http/http-response'
import { faker } from '@faker-js/faker'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.helpers.objectValue
})

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return await Promise.resolve(this.response)
  }
}
