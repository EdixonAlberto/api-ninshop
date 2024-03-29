import express from 'express'
import { apiLogger, getConfig } from '@UTILS'
import { requestDebug, errorCatch, corsMiddleware } from '@MIDDLEWARES'
import { mainRoutes } from '@ROUTES/main.routes'
import cors from 'cors'

export class ServerService {
  private readonly PORT_HTTP = getConfig().portHttp
  private app = express()

  constructor() {
    this.middlewares()
    this.routes()
  }

  private middlewares(): void {
    this.app.use('*', requestDebug)
    this.app.use(corsMiddleware())
    this.app.use(express.json())
  }

  private routes(): void {
    this.app.use('/api', mainRoutes)
    this.app.use(errorCatch)
  }

  public start(): void {
    this.app.listen(this.PORT_HTTP, () => {
      apiLogger('API', `listening on http://localhost:${this.PORT_HTTP}`)
    })
  }
}
