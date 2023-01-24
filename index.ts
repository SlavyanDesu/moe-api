import type { Options, Result } from './utils/interface.js'
import { traceByMediaUrl } from './utils/fetcher.js'

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

  async traceByUrl(url: string): Promise<Result | string | undefined> {
    return await traceByMediaUrl(url, this.options.cutBorders, this.options.anilistInfo, this.options.size, this.options.mute, this.options.apiKey)
  }
}

const moe = new TraceMoe({ cutBorders: true, size: 2, anilistInfo: false })
async function test() {
  return console.log(await moe.traceByUrl('https://images.plurk.com/32B15UXxymfSMwKGTObY5e.jpg'))
}

test()