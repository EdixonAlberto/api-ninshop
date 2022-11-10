import { Handler } from 'express'
import cors from 'cors'
import { getConfig } from '@UTILS'

export function corsMiddleware(): Handler {
  const { whiteList } = getConfig()

  return cors({
    origin(origin, callback) {
      if (whiteList.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  })
}
