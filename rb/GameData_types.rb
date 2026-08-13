# frozen_string_literal: true

# Typed models for the GameData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# GetGameById entity data model.
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
GetGameById = Struct.new(
  :source,
  :url,
  keyword_init: true
)

# Request payload for GetGameById#list.
#
# @!attribute [rw] id
#   @return [String]
GetGameByIdListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Popular entity data model.
#
# @!attribute [rw] headerImage
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] popularity
#   @return [Integer, nil]
#
# @!attribute [rw] releaseDate
#   @return [String, nil]
Popular = Struct.new(
  :headerImage,
  :id,
  :name,
  :popularity,
  :releaseDate,
  keyword_init: true
)

# Request payload for Popular#list.
#
# @!attribute [rw] headerImage
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] popularity
#   @return [Integer, nil]
#
# @!attribute [rw] releaseDate
#   @return [String, nil]
PopularListMatch = Struct.new(
  :headerImage,
  :id,
  :name,
  :popularity,
  :releaseDate,
  keyword_init: true
)

