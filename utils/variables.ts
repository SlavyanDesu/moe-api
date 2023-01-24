import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

export const __dirname = path.dirname(__filename)
export const baseUrl = 'https://api.trace.moe'
export const endpoints = {
  search: '/search?',
  me: '/me'
}
export const params = {
  url: 'url=',
  cutBorders: '&cutBorders',
  anilistInfo: '&anilistInfo',
  mute: '&mute',
  size: '&size=',
  key: '&key='
}