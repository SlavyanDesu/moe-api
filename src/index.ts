import type { Options, Result } from './interface.js'
import { me, traceByMediaUpload, traceByMediaUrl } from './fetcher.js'

export default class TraceMoe {
  options: Options

  constructor(options?: Options) {
    this.options = {
      apiKey: '',
      cutBorders: false,
      anilistInfo: true,
      mute: false,
      size: 1
    }
    Object.assign(this.options, options)
  }

  async traceByUrl(url: string): Promise<Result | string> {
    return await traceByMediaUrl(url, this.options)
  }

  async traceByFile(filePath: string): Promise<Result | string> {
    return await traceByMediaUpload(filePath, this.options)
  }

  async me(apiKey?: string) {
    return await me(apiKey)
  }
}

const moe = new TraceMoe({ cutBorders: true, size: 2, anilistInfo: true })
async function test() {
  return console.log(await moe.me())
}

test()