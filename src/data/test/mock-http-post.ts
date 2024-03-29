import { HttpPostParams } from '@/data/protocols/http/http-post-client'
import { faker } from '@faker-js/faker'
export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.helpers.objectValue
})
