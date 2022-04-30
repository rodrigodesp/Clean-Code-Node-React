import { HttpPostClient } from './../../protocols/http/http-post-client';
export class RemoteAuthentication {
    constructor (
        private readonly url: string,
        private readonly httPostClient: HttpPostClient
    ) {}

    async auth (): Promise<void> {
        await this.httPostClient.post({
            url: this.url
        })
        return Promise.resolve()
    }
}