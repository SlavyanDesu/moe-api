/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios, { AxiosResponse } from 'axios'
import fs from 'fs'
import path from 'path'
import type { Me, Options, Result, ResultData } from './interface.js'
import { baseUrl, endpoints, params } from './constants.js'

/**
 * Get the quality desired from `number` parameter.
 * @param {number} number - `0` small, `1` medium, `2` large. Default is `1`.
 * @returns {string} Returns the desired quality.
 */
function numberToQuality(number: number): string {
  switch(number) {
    case 0:
      return 's'
    case 1:
      return 'm'
    case 2:
      return 'l'
    default:
      return 'm'
  }
}

/**
 * Check if `url` is a media URL.
 * @param {string} url - URL to check.
 * @returns {RegExpMatchArray | null} Returns `RegExpMatchArray` if match, `null` otherwise.
 */
function isMediaUrl(url: string): RegExpMatchArray | null {
  return url.match(new RegExp(/(?:((?:https|http):\/\/)|(?:\/)).+(?:.jpg|jpeg|png|mp4|gif)/gmi))
}

/**
 * Combine search parameters.
 * @param {boolean} cutBorders - Cut the borders.
 * @param {boolean} anilistInfo - Include anilist info.
 * @param {number} size - The video quality.
 * @param {boolean} mute - Mute the video.
 * @param {string=} apiKey - API key.
 * @returns {string} Returns combined parameter.
 */
function combineParams(cutBorders: boolean, anilistInfo: boolean, size: number, mute: boolean, apiKey?: string): string {
  const opts = {
    cutBorders: cutBorders ? params.cutBorders : '',
    anilistInfo: anilistInfo ? params.anilistInfo : '',
    size: params.size + numberToQuality(size),
    mute: mute ? params.mute : '',
    apiKey: apiKey
  }
  return Object.values(opts).join('')
}

/**
 * Parse response from trace.moe API.
 * @param {AxiosResponse} response - Response from `axios.get()`.
 * @returns {Result | undefined} Returns `Result` if `response` is valid, `undefined` otherwise.
 */
function traceIt(response: AxiosResponse): Result | undefined {
  try {
    const { data } = response
    const { frameCount, error, result } = data
    const resultData: ResultData[] = []
    if (error) return error
    for (let i = 0; i < result.length; i++) {
      resultData.push({
        anilist: result[i].anilist,
        filename: result[i].filename,
        episode: result[i].episode,
        from: result[i].from,
        to: result[i].to,
        similarity: result[i].similarity,
        video: result[i].video,
        image: result[i].image
      })
    }
    const obj: Result = {
      frameCount: frameCount,
      error: error,
      result: resultData
    }
    return obj
  } catch (err) {
    console.error(err)
  }
}

/**
 * Get source from given media URL.
 * @param {string} url - Media URL.
 * @param {Options} options - Search options.
 * @returns {Promise<Result | string | undefined>} Returns `Result` if source exists, `string` if `url` not valid, and `undefined` otherwise.
 */
export async function traceByMediaUrl(url: string, options: Options): Promise<Result | string | undefined> {
  if (isMediaUrl(url)) {
    try {
      const paramaters = combineParams(options.cutBorders!, options.anilistInfo!, options.size!, options.mute!, options.apiKey)
      const request = baseUrl + endpoints.search + params.url + url + paramaters
      const response = await axios.get(request)
      return traceIt(response)
    } catch(err) {
      console.error(err)
    }
  } else {
    return `${url} is probably not a media URL!`
  }
}

/**
 * Get source from given file.
 * @param {string} filePath - File path.
 * @param {Options} options - Search options.
 * @returns {Promise<Result | string | undefined>} Returns `Result` if source exists, `string` if `url` not valid, and `undefined` otherwise.
 */
export async function traceByMediaUpload(filePath: string, options: Options): Promise<Result | string | undefined> {
  const file = path.join(path.resolve(process.cwd(), filePath || ''))
  if (fs.existsSync(file)) {
    try {
      const paramaters = combineParams(options.cutBorders!, options.anilistInfo!, options.size!, options.mute!, options.apiKey)
      const request = baseUrl + endpoints.search + paramaters
      const response = await axios.post(request, fs.readFileSync(file))
      return traceIt(response)
    } catch (err) {
      console.error(err)
    }
  } else {
    return `${filePath} doesn't exist!`
  }
}

/**
 * Check the search quota and limit for your account (with API key) or IP address (without API key).
 * @param {string=} apiKey - Your API key.
 * @returns {Promise<Me | undefined>} Returns your search quota and limit.
 */
export async function me(apiKey?: string): Promise<Me | undefined> {
  try {
    let response = await axios.get(baseUrl + endpoints.me.split('?')[0])
    if (apiKey) response = await axios.get(baseUrl + endpoints.me + params.key.split('&')[1] + apiKey)
    const { data } = response
    const { id, priority, concurrency, quota, quotaUsed } = data
    const result: Me = {
      id: id,
      priority: priority,
      concurrency: concurrency,
      quota: quota,
      quotaUsed: quotaUsed
    }
    return result
  } catch (err) {
    console.error(err)
  }
}