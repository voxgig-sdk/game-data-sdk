package voxgiggamedatasdk

import (
	"github.com/voxgig-sdk/game-data-sdk/go/core"
	"github.com/voxgig-sdk/game-data-sdk/go/entity"
	"github.com/voxgig-sdk/game-data-sdk/go/feature"
	_ "github.com/voxgig-sdk/game-data-sdk/go/utility"
)

// Type aliases preserve external API.
type GameDataSDK = core.GameDataSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type GameDataEntity = core.GameDataEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type GameDataError = core.GameDataError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGetGameByIdEntityFunc = func(client *core.GameDataSDK, entopts map[string]any) core.GameDataEntity {
		return entity.NewGetGameByIdEntity(client, entopts)
	}
	core.NewPopularEntityFunc = func(client *core.GameDataSDK, entopts map[string]any) core.GameDataEntity {
		return entity.NewPopularEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewGameDataSDK = core.NewGameDataSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewGameDataSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *GameDataSDK  { return NewGameDataSDK(nil) }
func Test() *GameDataSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
