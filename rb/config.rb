# GameData SDK configuration

module GameDataConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "GameData",
        "slug" => "game-data",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://fitgirlapi.onrender.com/api/v1",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "get_game_by_id" => {},
          "popular" => {},
        },
      },
      "entity" => {
        "get_game_by_id" => {
          "fields" => [
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "source",
              "short" => "Download source (e.g., FitGirl)",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "type" => "`$STRING`",
            },
          ],
          "name" => "get_game_by_id",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "570",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{id}",
                  "parts" => [
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "popular" => {
          "fields" => [
            {
              "name" => "headerImage",
              "short" => "URL to game header image",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Steam App ID",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Game title",
              "type" => "`$STRING`",
            },
            {
              "name" => "popularity",
              "short" => "Popularity rank from SteamSpy",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "releaseDate",
              "short" => "Game release date",
              "type" => "`$STRING`",
            },
          ],
          "name" => "popular",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/popular",
                  "parts" => [
                    "popular",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    GameDataFeatures.make_feature(name)
  end
end
