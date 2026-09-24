
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GameDataSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = GameDataSDK.test()
    equal(testsdk instanceof GameDataSDK, true,
      'GameDataSDK.test() must return a client synchronously')
  })

})
