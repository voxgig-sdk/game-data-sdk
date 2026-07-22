<?php
declare(strict_types=1);

// GameData SDK base feature

class GameDataBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(GameDataContext $ctx, array $options): void {}
    public function PostConstruct(GameDataContext $ctx): void {}
    public function PostConstructEntity(GameDataContext $ctx): void {}
    public function SetData(GameDataContext $ctx): void {}
    public function GetData(GameDataContext $ctx): void {}
    public function GetMatch(GameDataContext $ctx): void {}
    public function SetMatch(GameDataContext $ctx): void {}
    public function PrePoint(GameDataContext $ctx): void {}
    public function PreSpec(GameDataContext $ctx): void {}
    public function PreRequest(GameDataContext $ctx): void {}
    public function PreResponse(GameDataContext $ctx): void {}
    public function PreResult(GameDataContext $ctx): void {}
    public function PreDone(GameDataContext $ctx): void {}
    public function PreUnexpected(GameDataContext $ctx): void {}
}
