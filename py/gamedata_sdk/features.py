# GameData SDK feature factory

from gamedata_sdk.feature.base_feature import GameDataBaseFeature
from gamedata_sdk.feature.test_feature import GameDataTestFeature


def _make_feature(name):
    features = {
        "base": lambda: GameDataBaseFeature(),
        "test": lambda: GameDataTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
