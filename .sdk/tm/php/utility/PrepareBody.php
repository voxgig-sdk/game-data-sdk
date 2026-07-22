<?php
declare(strict_types=1);

// GameData SDK utility: prepare_body

class GameDataPrepareBody
{
    public static function call(GameDataContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
