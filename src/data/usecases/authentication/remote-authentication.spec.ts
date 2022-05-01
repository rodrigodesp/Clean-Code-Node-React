import { InvalidCredentialsError } from './../../../domain/errors/invalid-credentials-error';
import { mockAuthentication } from '@/domain/test/mock-authentication';
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import { randUrl } from '@ngneat/falso';
import { HttpStatusCode } from '@/data/protocols/http/http-response';

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = randUrl()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    return {
        sut,
        httpPostClientSpy
    }
}

describe('RemoteAuthentication', () => {
    test('Should call HttpPostClient with correct URL', async () => {        
        const url = randUrl()
        const {sut, httpPostClientSpy} = makeSut(url)
        await sut.auth(mockAuthentication())
        expect(httpPostClientSpy.url).toBe(url)
    })

    test('Should call HttpPostClient with correct body', async () => {
        const {sut, httpPostClientSpy} = makeSut()
        const mockAuthetication = mockAuthentication()
        await sut.auth(mockAuthetication)
        expect(httpPostClientSpy.body).toEqual(mockAuthetication)
    })

    test('Should throw InvalidCredentialsError if HttpPostClient returns 401 ', async () => {
        const {sut, httpPostClientSpy} = makeSut()        
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.unauthorized
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })
})