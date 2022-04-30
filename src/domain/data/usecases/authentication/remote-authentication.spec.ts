import { mockAuthentication } from '@/domain/test/mock-authentication';
import { HttpPostClientSpy } from '@/domain/data/test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import { randUrl } from '@ngneat/falso';

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
})