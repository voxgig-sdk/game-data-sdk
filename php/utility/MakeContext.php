<?php
declare(strict_types=1);

// GameData SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class GameDataMakeContext
{
    public static function call(array $ctxmap, ?GameDataContext $basectx): GameDataContext
    {
        return new GameDataContext($ctxmap, $basectx);
    }
}
