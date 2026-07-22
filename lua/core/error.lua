-- GameData SDK error

local GameDataError = {}
GameDataError.__index = GameDataError


function GameDataError.new(code, msg, ctx)
  local self = setmetatable({}, GameDataError)
  self.is_sdk_error = true
  self.sdk = "GameData"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function GameDataError:error()
  return self.msg
end


function GameDataError:__tostring()
  return self.msg
end


return GameDataError
