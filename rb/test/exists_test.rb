# GameData SDK exists test

require "minitest/autorun"
require_relative "../GameData_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = GameDataSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
