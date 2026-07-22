<?php
declare(strict_types=1);

// GameData SDK utility: result_body

class GameDataResultBody
{
    public static function call(GameDataContext $ctx): ?GameDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
