export interface ResultData {
  /**
   * AniList data.
   */
  anilist: AniList | number

  /**
   * Video file name.
   */
  filename: string

  /**
   * Anime episode.
   */
  episode: number

  /**
   * Start frame.
   */
  from: number

  /**
   * End frame.
   */
  to: number

  /**
   * Similarity.
   */
  similarity: number

  /**
   * Video URL.
   */
  video: string

  /**
   * Image URL.
   */
  image: string
}

export interface AniList {
  /**
   * AniList ID.
   */
  id: number

  /**
   * MAL ID.
   */
  idMal: number

  /**
   * Anime title.
   */
  title: {
    /**
     * Title in Japanese.
     */
    native: string

    /**
     * Title in romaji.
     */
    romaji: string

    /**
     * Title in English.
     */
    english: string
  },

  /**
   * Title synonyms.
   */
  synonyms: string[]

  /**
   * Is the anime for adult?
   */
  isAdult: boolean
}

export interface Result {
  /**
   * Total number of frames searched.
   */
  frameCount: number

  /**
   * Error message.
   */
  error: string | null

  /**
   * Search results.
   */
  result: ResultData[]
}

export interface Options {
  /**
   * Your API key.
   */
  apiKey?: string

  /**
   * Cut the borders?
   */
  cutBorders?: boolean

  /**
   * Include AniList info?
   */
  anilistInfo?: boolean

  /**
   * Mute generated video?
   */
  mute?: boolean

  /**
   * Size of generated video.
   */
  size?: number
}

export interface Me {
  /**
   * IP address (guest) or email address (user).
   */
  id: string

  /**
   * Your priority in search queue.
   */
  priority: number

  /**
   * Number of parallel search requests you can make.
   */
  concurrency: number

  /**
   * Search quota you have for this month.
   */
  quota: number

  /**
   * Search quota you have used this month.
   */
  quotaUsed: number
}