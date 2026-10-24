# GameData SDK utility: prepare_body
require_relative 'media'
module GameDataUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return GameDataUtilities.raw_body(ctx.reqdata) if GameDataUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
