<?php
declare(strict_types=1);

// GameData SDK utility: result_headers

class GameDataResultHeaders
{
    public static function call(GameDataContext $ctx): ?GameDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
