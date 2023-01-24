import type { Options, Result } from './interface.js'
import { traceByMediaUpload, traceByMediaUrl } from './fetcher.js'

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
}

const moe = new TraceMoe({ cutBorders: true, size: 2, anilistInfo: true })
async function test(file: string) {
  return console.log(await moe.traceByFile(file))
}

test('./media/test.jpg')
