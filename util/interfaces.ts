export interface Moe {
  apiKey?: string
  cutBorders?: boolean
}

export interface ResultData {
  anilist: number
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
  result: ResultData[]
}