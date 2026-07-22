package core

type GameDataError struct {
	IsGameDataError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewGameDataError(code string, msg string, ctx *Context) *GameDataError {
	return &GameDataError{
		IsGameDataError: true,
		Sdk:              "GameData",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *GameDataError) Error() string {
	return e.Msg
}
