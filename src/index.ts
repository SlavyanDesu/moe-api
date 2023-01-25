import type { Me, Options, Result } from './interface.js'
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

  /**
   * Trace anime source from media URL.
   * @param {string} url - Media URL.
   * @returns {Promise<Result | string>} Results from trace.moe API.
   */
  async traceByUrl(url: string): Promise<Result | string> {
    return await traceByMediaUrl(url, this.options)
  }

  /**
   * Trace anime source from media.
   * @param {string} filePath - File path.
   * @returns {Promise<Result | string>} Results from trace.moe API.
   */
  async traceByMedia(filePath: string): Promise<Result | string> {
    return await traceByMediaUpload(filePath, this.options)
  }

  /**
   * Check the search quota and limit for your account (with API key) or IP address (without API key).
   * @returns {Promise<Me>} Your search quota and limit.
   */
  async me(): Promise<Me> {
    return await me(this.options.apiKey)
  }
}