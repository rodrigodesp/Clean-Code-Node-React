import { HttpPostParams } from '@/data/protocols/http/http-post-client';
import { randNumber, randPost, randUrl } from '@ngneat/falso';
import axios from 'axios';
import { AxiosHttpClient } from "./axios-http-client";

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedPostResult = {
    data: randPost(),
    status: randNumber()
}
mockedAxios.post.mockResolvedValue(mockedPostResult)

const makeSut = (): AxiosHttpClient => {
    return new AxiosHttpClient()
}

const mockPostRequest =(): HttpPostParams<any> => ({
    url: randUrl(),
    body: randPost()
})

describe('AxiosHttpClient', () => {
    test('Should call axios with correct values', async () => {
        const request = mockPostRequest()
        const sut = makeSut()
        await sut.post(request)
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return the correct statusCode and body', async () => {        
        const sut = makeSut()
        const httpResponse = await sut.post(mockPostRequest())
        expect(httpResponse).toEqual({
            statusCode: mockedPostResult.status,
            body: mockedPostResult.data
        })
    })
});