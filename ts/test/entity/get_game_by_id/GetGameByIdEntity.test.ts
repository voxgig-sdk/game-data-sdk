

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { GameDataSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetGameByIdEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GAME_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('GAME_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GameDataSDK.test()
    const ent = testsdk.GetGameById()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GAME_DATA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_game_by_id.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"source","req":false,"short":"Download source (e.g., FitGirl)","type":"`$STRING`","index$":1},{"active":true,"format":"uri","name":"url","req":false,"type":"`$STRING`","index$":2}],"id":{"field":"id","name":"id"},"name":"get_game_by_id","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"example":"570","kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /{id}","json":"{\"operationId\":\"getGameById\",\"parameters\":[{\"description\":\"The official Steam App ID. Find IDs on SteamDB.\",\"example\":\"570\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"Detailed game description from Steam\",\"type\":\"string\"},\"developers\":{\"description\":\"List of game developers\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"downloadLinks\":{\"description\":\"Download links from FitGirl Repacks\",\"items\":{\"properties\":{\"source\":{\"description\":\"Download source (e.g., FitGirl)\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"genres\":{\"description\":\"Game genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"headerImage\":{\"description\":\"URL to game header image\",\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"Steam App ID\",\"type\":\"string\"},\"name\":{\"description\":\"Game title\",\"type\":\"string\"},\"platforms\":{\"properties\":{\"linux\":{\"type\":\"boolean\"},\"mac\":{\"type\":\"boolean\"},\"windows\":{\"type\":\"boolean\"}},\"type\":\"object\"},\"publishers\":{\"description\":\"List of game publishers\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"releaseDate\":{\"description\":\"Game release date\",\"type\":\"string\"},\"screenshots\":{\"description\":\"Array of screenshot URLs\",\"items\":{\"format\":\"uri\",\"type\":\"string\"},\"type\":\"array\"},\"shortDescription\":{\"description\":\"Short game description\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successfully retrieved game details\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Game not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{id}","segments":[{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"get_game_by_id","name__orig":"get_game_by_id","Name":"GetGameById","name_":"get_game_by_id","name-":"get-game-by-id","NAME":"GET_GAME_BY_ID","index$":0}, {"active":true,"entity":"get_game_by_id","key$":"BasicGetGameByIdFlow","kind":"basic","name":"BasicGetGameByIdFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"get_game_by_id_ref01"}}],"index$":0}]}, 'GetGameById')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_game_by_id_ref01_data = Object.values(setup.data.existing.get_game_by_id)[0] as any

    // LIST
    const get_game_by_id_ref01_ent = client.GetGameById()
    const get_game_by_id_ref01_match: any = {}

    const get_game_by_id_ref01_list = (await get_game_by_id_ref01_ent.list(get_game_by_id_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_game_by_id/GetGameByIdTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = GameDataSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['get_game_by_id01','get_game_by_id02','get_game_by_id03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GAME_DATA_TEST_GET_GAME_BY_ID_ENTID': idmap,
    'GAME_DATA_TEST_LIVE': 'FALSE',
    'GAME_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['GAME_DATA_TEST_GET_GAME_BY_ID_ENTID']

  const live = 'TRUE' === env.GAME_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GAME_DATA_TEST_GET_GAME_BY_ID_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new GameDataSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.GAME_DATA_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
