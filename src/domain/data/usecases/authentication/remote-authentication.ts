import { AuthenticationParams } from './../../../usecases/authentication';
import { HttpPostClient } from './../../protocols/http/http-post-client';
export class RemoteAuthentication {
    constructor (
        private readonly url: string,        
        private readonly httPostClient: HttpPostClient
    ) {}

    async auth (params: AuthenticationParams): Promise<void> {
        await this.httPostClient.post({
            url: this.url,
            body: params
        })
        return Promise.resolve()
    }
}