
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'GameData',
        slug: "game-data",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://fitgirlapi.onrender.com/api/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      get_game_by_id: {
      },

      popular: {
      },

    }
  }


  entity = {
    "get_game_by_id": {
      "fields": [
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "source",
          "short": "Download source (e.g., FitGirl)",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "type": "`$STRING`"
        }
      ],
      "name": "get_game_by_id",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "570",
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{id}",
              "parts": [
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "popular": {
      "fields": [
        {
          "name": "headerImage",
          "short": "URL to game header image",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Steam App ID",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "Game title",
          "type": "`$STRING`"
        },
        {
          "name": "popularity",
          "short": "Popularity rank from SteamSpy",
          "type": "`$INTEGER`"
        },
        {
          "name": "releaseDate",
          "short": "Game release date",
          "type": "`$STRING`"
        }
      ],
      "name": "popular",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/popular",
              "parts": [
                "popular"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

