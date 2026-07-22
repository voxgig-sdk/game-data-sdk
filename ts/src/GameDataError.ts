
import { Context } from './Context'


class GameDataError extends Error {

  isGameDataError = true

  sdk = 'GameData'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  GameDataError
}

