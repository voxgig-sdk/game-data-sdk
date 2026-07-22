<?php
declare(strict_types=1);

// GameData SDK exists test

require_once __DIR__ . '/../gamedata_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = GameDataSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
