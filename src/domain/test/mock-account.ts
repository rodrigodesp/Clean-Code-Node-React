import { AccountModel } from '@/domain/models/account-model';
import { AuthenticationParams } from "@/domain/usecases/authentication";
import { randEmail, randPassword } from "@ngneat/falso";
import { randomUUID } from 'crypto';

export const mockAuthentication =  (): AuthenticationParams => ({
    email: randEmail(),
    password: randPassword()
})

export const mockAccountModel =  (): AccountModel => ({
    accessToken: randomUUID()
})