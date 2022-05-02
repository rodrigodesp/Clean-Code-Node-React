import { UnexpectedError } from './../../../domain/errors/unexpected-error';
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
            case HttpStatusCode.ok: break
            case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
            case HttpStatusCode.badRequest: throw new UnexpectedError()
            case HttpStatusCode.notFound: throw new UnexpectedError()            
            case HttpStatusCode.serverError: throw new UnexpectedError()
            default: return Promise.resolve()
        }        
    }
}