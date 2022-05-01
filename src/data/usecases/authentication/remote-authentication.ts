import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { AuthenticationParams } from '@/domain/usecases/authentication';
import { HttpPostClient } from '@/data/protocols/http/http-post-client';
export class RemoteAuthentication {
    constructor (
        private readonly url: string,        
        private readonly httPostClient: HttpPostClient
    ) {}

    async auth (params: AuthenticationParams): Promise<void> {
        const httpResponse = await this.httPostClient.post({
            url: this.url,
            body: params
        })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
            default: return Promise.resolve()
        }        
    }
}