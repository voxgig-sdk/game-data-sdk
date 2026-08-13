# GetGameById entity test

require "minitest/autorun"
require "json"
require_relative "../GameData_sdk"
require_relative "runner"

class GetGameByIdEntityTest < Minitest::Test
  def test_create_instance
    testsdk = GameDataSDK.test(nil, nil)
    ent = testsdk.GetGameById(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "get_game_by_id" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = GameDataSDK.test(seed, nil)
    seen = base.GetGameById(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = GameDataConfig.make_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = GameDataSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.GetGameById(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = get_game_by_id_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "get_game_by_id." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set GAME_DATA_TEST_GET_GAME_BY_ID_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    get_game_by_id_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.get_game_by_id")))
    get_game_by_id_ref01_data = nil
    if get_game_by_id_ref01_data_raw.length > 0
      get_game_by_id_ref01_data = Helpers.to_map(get_game_by_id_ref01_data_raw[0][1])
    end

    # LIST
    get_game_by_id_ref01_ent = client.GetGameById(nil)
    get_game_by_id_ref01_match = {}

    get_game_by_id_ref01_list_result = get_game_by_id_ref01_ent.list(get_game_by_id_ref01_match, nil)
    assert get_game_by_id_ref01_list_result.is_a?(Array)

  end
end

def get_game_by_id_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "get_game_by_id", "GetGameByIdTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = GameDataSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["get_game_by_id01", "get_game_by_id02", "get_game_by_id03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["GAME_DATA_TEST_GET_GAME_BY_ID_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "GAME_DATA_TEST_GET_GAME_BY_ID_ENTID" => idmap,
    "GAME_DATA_TEST_LIVE" => "FALSE",
    "GAME_DATA_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["GAME_DATA_TEST_GET_GAME_BY_ID_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["GAME_DATA_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = GameDataSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["GAME_DATA_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["GAME_DATA_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
