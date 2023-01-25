/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios, { AxiosResponse } from 'axios'
import fs from 'fs'
import path from 'path'
import type { Me, Options, Result, ResultData } from './interface.js'
import { baseUrl, endpoints, params } from './constants.js'

/**
 * Returns a string of quality desired from given `number` parameter.
 * @param {number} number - `0` small, `1` medium, `2` large. Default is `1`.
 * @returns {string} Desired quality in string.
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
 * Returns an array if `url` is media URL.
 * @param url - URL to check.
 * @returns {RegExpMatchArray | null} Array if match.
 */
function isMediaUrl(url: string): RegExpMatchArray | null {
  return url.match(new RegExp(/(?:((?:https|http):\/\/)|(?:\/)).+(?:.jpg|jpeg|png|mp4|gif)/gmi))
}

/**
 * Returns a combined parameter.
 * @param {boolean} cutBorders - Cut borders.
 * @param {boolean} anilistInfo - Include anilist info.
 * @param {number} size - Video quality.
 * @param {boolean} mute - Mute the video.
 * @param {string=} apiKey - API key.
 * @returns {string} Combined parameter.
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
 * Returns parsed response from trace.moe API.
 * @param {AxiosResponse} response - Response from `axios.get()`.
 * @returns {Result | string} Results from trace.moe API.
 */
function traceIt(response: AxiosResponse): Result | string {
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
}

/**
 * Trace source by media URL.
 * @param {string} url - Media URL.
 * @param {Options} options - Search options.
 * @returns {Promise<Result | string>} Results from trace.moe.
 */
export async function traceByMediaUrl(url: string, options: Options): Promise<Result | string> {
  if (isMediaUrl(url)) {
    const paramaters = combineParams(options.cutBorders!, options.anilistInfo!, options.size!, options.mute!, options.apiKey)
    const request = baseUrl + endpoints.search + params.url + url + paramaters
    const response = await axios.get(request)
    return traceIt(response)
  } else {
    return `${url} is probably not a media URL!`
  }
}

/**
 * Trace source by uploading media.
 * @param {string} filePath - File path.
 * @param {Options} options - Search options.
 * @returns {Promise<Result | string>} Results from trace.moe.
 */
export async function traceByMediaUpload(filePath: string, options: Options): Promise<Result | string> {
  const file = path.join(path.resolve(process.cwd(), filePath || ''))
  if (fs.existsSync(file)) {
    const paramaters = combineParams(options.cutBorders!, options.anilistInfo!, options.size!, options.mute!, options.apiKey)
    const request = baseUrl + endpoints.search + paramaters
    const response = await axios.post(request, fs.readFileSync(file))
    return traceIt(response)
  } else {
    return `${filePath} doesn't exist!`
  }
}

/**
 * Check the search quota and limit for your account (with API key) or IP address (without API key).
 * @param {string} apiKey - Your API key.
 * @returns {Promise<Me>} Your search quota and limit.
 */
export async function me(apiKey?: string): Promise<Me> {
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
}