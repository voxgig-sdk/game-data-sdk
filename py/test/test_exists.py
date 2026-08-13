# GameData SDK exists test

import pytest
from gamedata_sdk import GameDataSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = GameDataSDK.test(None, None)
        assert testsdk is not None
