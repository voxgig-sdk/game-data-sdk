<?php
declare(strict_types=1);

// GameData SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class GameDataFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new GameDataBaseFeature();
            case "test":
                return new GameDataTestFeature();
            default:
                return new GameDataBaseFeature();
        }
    }
}
