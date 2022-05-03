import { HttpPostParams } from '@/data/protocols/http/http-post-client';
import { randPost, randUrl } from '@ngneat/falso';

export const mockPostRequest = (): HttpPostParams<any> => ({
    url: randUrl(),
    body: randPost()
})