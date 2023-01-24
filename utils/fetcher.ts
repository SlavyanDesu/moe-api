/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import type { Result, ResultDataWithAnilist, ResultData } from './interface.js'
import { baseUrl, endpoints, params, __dirname } from './variables.js'

export function numberToQuality(number: number | undefined): string {
  switch(number) {
    case 0:
      return 's'
      break
    case 1:
      return 'm'
      break
    case 2:
      return 'l'
      break
    default:
      return 'm'
      break
  }
}

export function isMediaUrl(url: string): RegExpMatchArray | null {
  return url.match(new RegExp(/(?:((?:https|http):\/\/)|(?:\/)).+(?:.jpg|jpeg|png|mp4|gif)/gmi))
}

export function traceIt(response: any, withAnilistInfo = true): Result | string | undefined {
  if (withAnilistInfo) {
    const resultData: ResultDataWithAnilist[] = []
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

      const obj: Result = {
        frameCount: frameCount,
        error: error,
        result: resultData
      }

      return obj
    } else {
      return error
    }
  } else {
    const resultData: ResultData[] = []
    const { data } = response
    const { frameCount, error, result } = data
    if (!error) {
      for (let i = 0; i < result.length; i++) {
        const {
          filename,
          episode,
          from,
          to,
          similarity,
          video,
          image
        } = result[i]

        resultData.push({
          filename: filename,
          episode: episode,
          from: from,
          to: to,
          similarity: similarity,
          video: video,
          image: image
         })
      }

      const obj: Result = {
        frameCount: frameCount,
        error: error,
        result: resultData
      }

      return obj
    } else {
      return error
    }
  }
}

export async function traceByMediaUrl(url: string, cutBorders: boolean | undefined, anilistInfo: boolean | undefined, size: number | undefined, mute: boolean | undefined, apiKey: string | undefined): Promise<Result | string | undefined> {
  if (isMediaUrl(url)) {
    try {
      const base = baseUrl + endpoints.search + params.url + url
      const request = base + (cutBorders ? params.cutBorders : '') + (anilistInfo ? params.anilistInfo : '') + params.size + numberToQuality(size) + (mute ? params.mute : '') + (apiKey ? params.key + apiKey : '')
      const response = await axios.get(request)
      return traceIt(response, anilistInfo)
    } catch (err) {
      console.error(err)
    }
  } else {
    return 'URL not valid!'
  }
}


export async function traceByMediaUpload(filePath: string): Promise<Result | string | undefined> {
  const file = path.resolve(__dirname, filePath)
  if (fs.existsSync(file)) {
    try {
      const response = await axios.post(baseUrl, fs.readFileSync(file))
      return traceIt(response)
    } catch (err) {
      console.error(err)
    }
  } else {
    return `${filePath} doesn't exist!`
  }
}