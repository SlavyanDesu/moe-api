import type { Moe } from './util/interfaces.js'

export default class TraceMoe implements Moe {
  apiKey?: string | undefined
  cutBorders?: boolean | undefined

  constructor({ apiKey = '',  cutBorders = false }) {
    this.apiKey = apiKey
    this.cutBorders = cutBorders
  }


}