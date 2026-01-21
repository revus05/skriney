import { Client, credentials, ChannelCredentials } from '@grpc/grpc-js'

class RpcTransport {
  private readonly client: Client

  constructor(address: string, creds: ChannelCredentials) {
    this.client = new Client(address, creds)
  }

  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      this.client.makeUnaryRequest(
        `/${service}/${method}`,
        (arg: Buffer) => arg,
        (arg: Buffer) => arg,
        Buffer.from(data),
        (err, response) => {
          if (err) {
            reject(err)
          } else {
            resolve(new Uint8Array(response as Buffer))
          }
        },
      )
    })
  }
}

export const rpc = new RpcTransport(
  process.env.GRPC_URL || '',
  process.env.NODE_ENV === 'production'
    ? credentials.createSsl()
    : credentials.createInsecure(),
)
