# GameData SDK utility: make_context
require_relative '../core/context'
module GameDataUtilities
  MakeContext = ->(ctxmap, basectx) {
    GameDataContext.new(ctxmap, basectx)
  }
end
