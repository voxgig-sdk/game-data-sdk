-- Typed models for the GameData SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GetGameById
---@field source? string
---@field url? string

---@class GetGameByIdListMatch
---@field id string

---@class Popular
---@field headerImage? string
---@field id? string
---@field name? string
---@field popularity? number
---@field releaseDate? string

---@class PopularListMatch
---@field headerImage? string
---@field id? string
---@field name? string
---@field popularity? number
---@field releaseDate? string

local M = {}

return M
