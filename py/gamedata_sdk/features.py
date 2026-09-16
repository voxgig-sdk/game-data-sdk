# GameData SDK feature factory

from gamedata_sdk.feature.base_feature import GameDataBaseFeature
from gamedata_sdk.feature.ratelimit_feature import GameDataRatelimitFeature
from gamedata_sdk.feature.retry_feature import GameDataRetryFeature
from gamedata_sdk.feature.test_feature import GameDataTestFeature
from gamedata_sdk.feature.timeout_feature import GameDataTimeoutFeature


_FEATURES = {
    "base": lambda: GameDataBaseFeature(),
    "ratelimit": lambda: GameDataRatelimitFeature(),
    "retry": lambda: GameDataRetryFeature(),
    "test": lambda: GameDataTestFeature(),
    "timeout": lambda: GameDataTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
