/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios'
import fs from 'fs'
import path from 'path'
import type { Me, Options, Result, ResultData } from './interface.js'
import { baseUrl, endpoints, params } from './constants.js'

function numberToQuality(number: number): string {
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

function isMediaUrl(url: string): RegExpMatchArray | null {
  return url.match(new RegExp(/(?:((?:https|http):\/\/)|(?:\/)).+(?:.jpg|jpeg|png|mp4|gif)/gmi))
}

function combineParams(cutBorders?: boolean, anilistInfo?: boolean, size?: number, mute?: boolean, apiKey?: string) {
  const opts = {
    cutBorders: cutBorders ? params.cutBorders : '',
    anilistInfo: anilistInfo ? params.anilistInfo : '',
    size: params + numberToQuality(size!),
    mute: mute ? params.mute : '',
    apiKey: apiKey
  }
  return Object.values(opts).join('')
}

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

export async function traceByMediaUrl(url: string, options: Options): Promise<Result | string> {
  if (isMediaUrl(url)) {
    try {
      const paramaters = combineParams(options.cutBorders, options.anilistInfo, options.size, options.mute, options.apiKey)
      const request = baseUrl + endpoints.search + params.url + url + paramaters
      const response = await axios.get(request)
      return traceIt(response)
    } catch (err) {
      throw(err)
    }
  } else {
    return 'URL not valid!'
  }
}

export async function traceByMediaUpload(filePath: string, options: Options): Promise<Result | string> {
  const file = path.join(path.resolve(process.cwd(), filePath || ''))
  if (fs.existsSync(file)) {
    try {
      const paramaters = combineParams(options.cutBorders, options.anilistInfo, options.size, options.mute, options.apiKey)
      const request = baseUrl + endpoints.search + paramaters
      const response = await axios.post(request, fs.readFileSync(file))
      return traceIt(response)
    } catch (err) {
      throw(err)
    }
  } else {
    return `${filePath} doesn't exist!`
  }
}

export async function me(apiKey?: string) {
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