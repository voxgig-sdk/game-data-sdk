# GameData SDK utility: make_context

from core.context import GameDataContext


def make_context_util(ctxmap, basectx):
    return GameDataContext(ctxmap, basectx)
