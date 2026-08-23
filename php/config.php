<?php
declare(strict_types=1);

// GameData SDK configuration

class GameDataConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "GameData",
                "slug" => "game-data",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://fitgirlapi.onrender.com/api/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "get_game_by_id" => [],
                    "popular" => [],
                ],
            ],
            "entity" => [
        'get_game_by_id' => [
          'fields' => [
            [
              'name' => 'source',
              'short' => 'Download source (e.g., FitGirl)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'get_game_by_id',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => '570',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{id}',
                  'parts' => [
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'popular' => [
          'fields' => [
            [
              'name' => 'headerImage',
              'short' => 'URL to game header image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Steam App ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Game title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'popularity',
              'short' => 'Popularity rank from SteamSpy',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'releaseDate',
              'short' => 'Game release date',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'popular',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/popular',
                  'parts' => [
                    'popular',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return GameDataFeatures::make_feature($name);
    }
}
