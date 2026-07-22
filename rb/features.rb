# GameData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module GameDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      GameDataBaseFeature.new
    when "test"
      GameDataTestFeature.new
    else
      GameDataBaseFeature.new
    end
  end
end
