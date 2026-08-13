<?php
declare(strict_types=1);

// Typed models for the GameData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** GetGameById entity data model. */
class GetGameById
{
    public ?string $source = null;
    public ?string $url = null;
}

/** Request payload for GetGameById#list. */
class GetGameByIdListMatch
{
    public string $id;
}

/** Popular entity data model. */
class Popular
{
    public ?string $headerImage = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?int $popularity = null;
    public ?string $releaseDate = null;
}

/** Request payload for Popular#list. */
class PopularListMatch
{
    public ?string $headerImage = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?int $popularity = null;
    public ?string $releaseDate = null;
}

