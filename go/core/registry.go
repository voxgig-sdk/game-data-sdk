package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewGetGameByIdEntityFunc func(client *GameDataSDK, entopts map[string]any) GameDataEntity

var NewPopularEntityFunc func(client *GameDataSDK, entopts map[string]any) GameDataEntity

