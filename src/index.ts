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
   * Trace anime source from given media URL.
   * @param {string} url - Media URL.
   * @returns {Promise<Result | string>} Returns `Result` if source exists, `string` if `url` not valid, and `undefined` otherwise.
   */
  async traceByUrl(url: string): Promise<Result | string | undefined> {
    return await traceByMediaUrl(url, this.options)
  }

  /**
   * Trace anime source from given file.
   * @param {string} filePath - File path.
   * @returns {Promise<Result | string>} Returns `Result` if source exists, `string` if `url` not valid, and `undefined` otherwise.
   */
  async traceByMedia(filePath: string): Promise<Result | string | undefined> {
    return await traceByMediaUpload(filePath, this.options)
  }

  /**
   * Check the search quota and limit for your account (with API key) or IP address (without API key).
   * @returns {Promise<Me | undefined>} Returns your search quota and limit.
   */
  async me(): Promise<Me | undefined> {
    return await me(this.options.apiKey)
  }
}