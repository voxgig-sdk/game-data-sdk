

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


describe('PopularEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GAME_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('GAME_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GameDataSDK.test()
    const ent = testsdk.Popular()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GAME_DATA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'popular.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"uri","name":"headerImage","req":false,"short":"URL to game header image","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"short":"Steam App ID","type":"`$STRING`","index$":1},{"active":true,"name":"name","req":false,"short":"Game title","type":"`$STRING`","index$":2},{"active":true,"name":"popularity","req":false,"short":"Popularity rank from SteamSpy","type":"`$INTEGER`","index$":3},{"active":true,"name":"releaseDate","req":false,"short":"Game release date","type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"popular","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /popular","json":"{\"operationId\":\"getPopularGames\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"headerImage\":{\"description\":\"URL to game header image\",\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"Steam App ID\",\"type\":\"string\"},\"name\":{\"description\":\"Game title\",\"type\":\"string\"},\"popularity\":{\"description\":\"Popularity rank from SteamSpy\",\"type\":\"integer\"},\"releaseDate\":{\"description\":\"Game release date\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successfully retrieved popular games\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/popular","segments":[{"lit":"popular"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"popular","name__orig":"popular","Name":"Popular","name_":"popular","name-":"popular","NAME":"POPULAR","index$":1}, {"active":true,"entity":"popular","key$":"BasicPopularFlow","kind":"basic","name":"BasicPopularFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"popular_ref01"}}],"index$":0}]}, 'Popular')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let popular_ref01_data = Object.values(setup.data.existing.popular)[0] as any

    // LIST
    const popular_ref01_ent = client.Popular()
    const popular_ref01_match: any = {}

    const popular_ref01_list = (await popular_ref01_ent.list(popular_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/popular/PopularTestData.json')

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
    ['popular01','popular02','popular03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GAME_DATA_TEST_POPULAR_ENTID': idmap,
    'GAME_DATA_TEST_LIVE': 'FALSE',
    'GAME_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['GAME_DATA_TEST_POPULAR_ENTID']

  const live = 'TRUE' === env.GAME_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GAME_DATA_TEST_POPULAR_ENTID']
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
  
