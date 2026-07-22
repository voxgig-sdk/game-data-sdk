# GameData SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

GameDataUtility.registrar = ->(u) {
  u.clean = GameDataUtilities::Clean
  u.done = GameDataUtilities::Done
  u.make_error = GameDataUtilities::MakeError
  u.feature_add = GameDataUtilities::FeatureAdd
  u.feature_hook = GameDataUtilities::FeatureHook
  u.feature_init = GameDataUtilities::FeatureInit
  u.fetcher = GameDataUtilities::Fetcher
  u.make_fetch_def = GameDataUtilities::MakeFetchDef
  u.make_context = GameDataUtilities::MakeContext
  u.make_options = GameDataUtilities::MakeOptions
  u.make_request = GameDataUtilities::MakeRequest
  u.make_response = GameDataUtilities::MakeResponse
  u.make_result = GameDataUtilities::MakeResult
  u.make_point = GameDataUtilities::MakePoint
  u.make_spec = GameDataUtilities::MakeSpec
  u.make_url = GameDataUtilities::MakeUrl
  u.param = GameDataUtilities::Param
  u.prepare_auth = GameDataUtilities::PrepareAuth
  u.prepare_body = GameDataUtilities::PrepareBody
  u.prepare_headers = GameDataUtilities::PrepareHeaders
  u.prepare_method = GameDataUtilities::PrepareMethod
  u.prepare_params = GameDataUtilities::PrepareParams
  u.prepare_path = GameDataUtilities::PreparePath
  u.prepare_query = GameDataUtilities::PrepareQuery
  u.result_basic = GameDataUtilities::ResultBasic
  u.result_body = GameDataUtilities::ResultBody
  u.result_headers = GameDataUtilities::ResultHeaders
  u.transform_request = GameDataUtilities::TransformRequest
  u.transform_response = GameDataUtilities::TransformResponse
}
