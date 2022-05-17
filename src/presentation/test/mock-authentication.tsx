import { AccountModel } from '@/domain/models/account-model'
import { mockAccountModel } from '@/domain/test/mock-account'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams
  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return await Promise.resolve(this.account)
  }
}
