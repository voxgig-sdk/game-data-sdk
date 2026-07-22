
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GameDataSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await GameDataSDK.test()
    equal(null !== testsdk, true)
  })

})
