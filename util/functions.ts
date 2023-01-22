/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Result, ResultData } from './interfaces.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const baseUrl = 'https://api.trace.moe/search'
const endpoints = {
  byUrl: '?url='
}

/**
 * Check is URL a media URL.
 *
 * @param {string} url - URL.
 * @returns {RegExpMatchArray | null} An Array whose contents depend on the presence or absence of the global (g) flag, or `null` if no matches are found.
 */
export function isUrl(url: string): RegExpMatchArray | null {
  return url.match(new RegExp(/(?:((?:https|http):\/\/)|(?:\/)).+(?:.mp3|mp4|gif)/gmi))
}

/**
 * Get result from trace.moe API.
 *
 * @param {any} response - Axios get result response.
 * @returns {Result | string | undefined} Return result if resolved and return error message if rejected.
 */
export function traceIt(response: any): Result | string | undefined {
  const resultData: ResultData[] = []
  const { data } = response
  const { frameCount, error, result } = data
  if (!error) {
    for (let i = 0; i < result.length; i++) {
      const {
        anilist,
        filename,
        episode,
        from,
        to,
        similarity,
        video,
        image
      } = result[i]
      resultData.push({
        anilist: anilist,
        filename: filename,
        episode: episode,
        from: from,
        to: to,
        similarity: similarity,
        video: video,
        image: image
      })
    }
    const objectResult: Result = {
      frameCount: frameCount,
      error: error,
      result: resultData
    }
    return objectResult
  } else {
    return error
  }
}

/**
 * Get source from media URL.
 *
 * @param {string} url - Media URL.
 * @returns {Promise<Result | string | undefined>} Return an array object of results.
 */
export async function traceByMediaUrl(url: string): Promise<Result | string | undefined> {
  if (!isUrl(url)) {
    try {
      const response = await axios.get(baseUrl + endpoints.byUrl + encodeURIComponent(url))
      return traceIt(response)
    } catch (err) {
      console.error(err.response.data.error)
    }
  } else {
    return 'URL not valid!'
  }
}

/**
 * Get source from media by uploading it.
 *
 * @param {string} filePath - Media path.
 * @returns {Promise<Result | string | undefined>} Return an array object of results.
 */
export async function traceByMediaUpload(filePath: string): Promise<Result | string | undefined> {
  const content = path.resolve(__dirname, filePath)
  if (fs.existsSync(content)) {
    try {
      const response = await axios.post(baseUrl, fs.readFileSync(content))
      return traceIt(response)
    } catch (err) {
      console.error(err)
    }
  } else {
    return `Path ${filePath} doesn't exist!`
  }
}

(async function () {
  console.log(await traceByMediaUpload('../media/test.jpg'))
})()