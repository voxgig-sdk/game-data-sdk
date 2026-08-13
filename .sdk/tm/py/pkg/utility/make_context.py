# GameData SDK utility: make_context

from projectname_sdk.core.context import GameDataContext


def make_context_util(ctxmap, basectx):
    return GameDataContext(ctxmap, basectx)
