import { AccountModel } from '@/domain/models/account-model'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { faker } from '@faker-js/faker'
import { AddAccountParams } from '@/domain/usecases/add-account'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAddAccount = (): AddAccountParams => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  passwordConfirmation: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})
