import { getGamesAmerica } from 'nintendo-switch-eshop'
import { resolve } from 'path'
import { writeFile } from 'fs/promises'

export class DatabaseService {
  public async populate(): Promise<boolean | string> {
    const data = await getGamesAmerica()
    const jsonData = JSON.stringify(data)
    const path = resolve('src', 'database')

    try {
      await writeFile(resolve(path, 'games.json'), jsonData, { encoding: 'utf-8', flag: 'w' })
      console.log(`JSON data is saved in ${path}`)
      return true
    } catch (error) {
      const { message } = error as Error
      console.log(DatabaseService.name, 'ERROR', message)
      return message
    }
  }
}
