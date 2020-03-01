module Squares.Main exposing (..)

import Browser
import Html exposing (Html, button, div, p, text)
import Html.Events exposing (onClick)


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }


type alias Model =
    String


type Msg
    = Bang


init : Model
init =
    "Squares"


view : Model -> Html Msg
view model =
    div []
        [ p [] [ text model ]
        , button [ onClick Bang ] [ text "Bang" ]
        ]


update : Msg -> Model -> Model
update msg model =
    case msg of
        Bang ->
            model ++ "!"
