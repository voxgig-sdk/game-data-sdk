

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"headerImage":{"a":true,"fo":"uri","h":"Header Image","n":"headerImage","r":false,"sh":"URL to game header image","t":"`$STRING`","key$":"headerImage","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Steam App ID","t":"`$STRING`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Game title","t":"`$STRING`","key$":"name","index$":2},"popularity":{"a":true,"h":"Popularity","n":"popularity","r":false,"sh":"Popularity rank from SteamSpy","t":"`$INTEGER`","key$":"popularity","index$":3},"releaseDate":{"a":true,"h":"Release Date","n":"releaseDate","r":false,"sh":"Game release date","t":"`$STRING`","key$":"releaseDate","index$":4}},"id":{"field":"id","name":"id"},"name":"popular","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /popular","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/popular","q":{},"r":{},"s":[{"lit":"popular"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"popular","name__orig":"popular","Name":"Popular","name_":"popular","name-":"popular","NAME":"POPULAR","index$":1}, {"active":true,"entity":"popular","key$":"BasicPopularFlow","kind":"basic","name":"BasicPopularFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"popular_ref01"}}],"index$":0}]}, 'Popular', {"GET /popular":{"protocol":"http","operationId":"getPopularGames","responses":{"200":{"description":"Successfully retrieved popular games","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","description":"Steam App ID","key$":"id"},"name":{"type":"string","description":"Game title","key$":"name"},"popularity":{"type":"integer","description":"Popularity rank from SteamSpy","key$":"popularity"},"headerImage":{"type":"string","format":"uri","description":"URL to game header image","key$":"headerImage"},"releaseDate":{"type":"string","description":"Game release date","key$":"releaseDate"}},"x-ref":"#/components/schemas/GameSummary","index$":0}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"code":{"type":"integer","description":"Error code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"}})
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
  
