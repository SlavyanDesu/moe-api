import type { Me, Options, Result } from './interface.js'
import { me, traceFromMediaFile, traceFromMediaUrl, traceFromBase64 } from './fetcher.js'

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
   * Get source from given media URL.
   * @param {string} url - Media URL.
   * @returns {Promise<Result | string>} Returns `Result` if source exists, `undefined` otherwise.
   */
  async traceFromUrl(url: string): Promise<Result | string | undefined> {
    return await traceFromMediaUrl(url, this.options)
  }

  /**
   * Get source from given file.
   * @param {string} filePath - File path.
   * @returns {Promise<Result | string>} Returns `Result` if source exists, `undefined` otherwise.
   */
  async traceFromFile(filePath: string): Promise<Result| undefined> {
    return await traceFromMediaFile(filePath, this.options)
  }

  /**
   * Get source from Base64 string or data URL.
   * @param {string} base64 - Base64 string or data URL.
   * @returns {Promise<Result | string | undefined>} Returns `Result` if source exists, `undefined` otherwise.
   */
  async traceFromBase64(base64: string): Promise<Result | string | undefined> {
    return await traceFromBase64(base64, this.options)
  }

  /**
   * Check the search quota and limit for your account (with API key) or IP address (without API key).
   * @returns {Promise<Me | undefined>} Returns your search quota and limit.
   */
  async me(): Promise<Me | undefined> {
    return await me(this.options.apiKey)
  }
}