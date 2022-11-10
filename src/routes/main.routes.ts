import { Router, Response } from 'express'
import fs from 'fs'
import { resolve } from 'path'
import { getGamesAmerica } from 'nintendo-switch-eshop'

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

router.get(
  '/games',
  async (_, res: Response): Promise<void> => {
    try {
      const data = await getGamesAmerica()
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
