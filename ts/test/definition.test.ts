import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "get_game_by_id",
    "accessor": "GetGameById",
    "op": "list",
    "method": "GET",
    "path": "/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "570"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "description": "x",
      "shortDescription": "x",
      "headerImage": "x",
      "screenshots": [
        "x"
      ],
      "developers": [
        "x"
      ],
      "publishers": [
        "x"
      ],
      "genres": [
        "x"
      ],
      "releaseDate": "x",
      "platforms": {
        "windows": true,
        "mac": true,
        "linux": true
      },
      "downloadLinks": [
        {
          "url": "x",
          "source": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "popular",
    "accessor": "Popular",
    "op": "list",
    "method": "GET",
    "path": "/popular",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "x",
        "name": "x",
        "popularity": 1,
        "headerImage": "x",
        "releaseDate": "x"
      }
    ],
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
