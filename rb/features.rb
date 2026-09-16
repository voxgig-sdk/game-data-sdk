# GameData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module GameDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      GameDataBaseFeature.new
    when "ratelimit"
      GameDataRatelimitFeature.new
    when "retry"
      GameDataRetryFeature.new
    when "test"
      GameDataTestFeature.new
    when "timeout"
      GameDataTimeoutFeature.new
    else
      GameDataBaseFeature.new
    end
  end
end
