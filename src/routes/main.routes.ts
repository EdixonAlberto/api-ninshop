import { Router, Response } from 'express'
import { resolve } from 'path'
import fs from 'fs'
import { DatabaseService } from '@SERVICES/Database.service'

const router = Router()

router.get('/', (_, res: Response): void => {
  const pkg = JSON.parse(fs.readFileSync(resolve('package.json'), 'utf8'))

  res.status(200).json({
    status: 'OK',
    version: pkg.version,
    name: pkg.name,
    description: pkg.description,
    date: new Date().toISOString()
  })
})

router.post(
  '/populate_database',
  async (_, res: Response): Promise<void> => {
    const result = await new DatabaseService().populate()

    if (typeof result === 'string') {
      res.status(500).json({
        data: null,
        error: result
      })
      return
    }

    res.status(200).json({
      data: 'JSON data generated',
      error: null
    })
  }
)

router.get(
  '/games',
  async (_, res: Response): Promise<void> => {
    try {
      const data = JSON.parse(fs.readFileSync(resolve('src', 'database', 'games.json'), 'utf8'))
      res.status(200).json({
        data,
        error: null
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        data: null,
        error
      })
    }
  }
)

export { router as mainRoutes }
