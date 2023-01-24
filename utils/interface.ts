export interface ResultDataWithAnilist {
  anilist: object
  filename: string
  episode: number
  from: number
  to: number
  similarity: number
  video: string
  image: string
}

export interface ResultData {
  filename: string
  episode: number
  from: number
  to: number
  similarity: number
  video: string
  image: string
}

export interface Result {
  frameCount: number
  error: string
  result: ResultDataWithAnilist[] | ResultData[]
}

export interface Options {
  apiKey?: string
  cutBorders?: boolean
  anilistInfo?: boolean
  mute?: boolean
  size?: number
}