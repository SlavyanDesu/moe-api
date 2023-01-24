import type { Options, Result } from './utils/interface.js'
import { traceByMediaUpload, traceByMediaUrl } from './utils/fetcher.js'

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

  async traceByFile(filePath: string): Promise< Result | string | undefined > {
    return await traceByMediaUpload(filePath, this.options.cutBorders, this.options.anilistInfo, this.options.size, this.options.mute, this.options.apiKey)
  }
}

const moe = new TraceMoe({ cutBorders: true, size: 2, anilistInfo: true })
async function test() {
  return console.log(await moe.traceByFile('./media/test.jpg'))
}

test()