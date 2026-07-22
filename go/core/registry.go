package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGetGameByIdEntityFunc func(client *GameDataSDK, entopts map[string]any) GameDataEntity

var NewPopularEntityFunc func(client *GameDataSDK, entopts map[string]any) GameDataEntity

