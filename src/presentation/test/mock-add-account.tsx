import { AccountModel } from '@/domain/models/account-model'
import { mockAccountModel } from '@/domain/test/mock-account'
import { AddAccount, AddAccountParams } from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AddAccountParams
  callsCount = 0
  async add (params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return await Promise.resolve(this.account)
  }
}
