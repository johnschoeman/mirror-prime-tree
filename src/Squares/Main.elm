module Squares.Main exposing (..)

import Browser
import Browser.Dom exposing (getViewport)
import Color
import Html exposing (Html, button, div, p, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Svg exposing (circle, rect, svg)
import Svg.Attributes exposing (cx, cy, fill, height, r, rx, ry, viewBox, width, x, y)
import Task


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }


type alias Model =
    { colNumber : Int
    }


type Msg
    = IncrementColNumber
    | DecrementColNumber


init : Model
init =
    { colNumber = 3 }


view : Model -> Html Msg
view model =
    let
        buttonStyle =
            "mr-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    in
    div [ class "p-32" ]
        [ div []
            [ button [ class buttonStyle, onClick IncrementColNumber ] [ text "+" ]
            , button [ class buttonStyle, onClick DecrementColNumber ] [ text "-" ]
            ]
        , art model
        ]


art : Model -> Html Msg
art model =
    let
        colNumber =
            model.colNumber

        gridClass =
            "grid grid-cols-" ++ String.fromInt colNumber
    in
    div [ class (gridClass ++ "flex my-vmin m-auto border-2") ] (listOfDots <| colNumber)


listOfDots : Int -> List (Html msg)
listOfDots count =
    let
        baseMatrix =
            List.repeat count (List.repeat count 0)
    in
    List.indexedMap (\rowIdx row -> rowToDots rowIdx row) baseMatrix


rowToDots : Int -> List a -> Html msg
rowToDots rowIdx row =
    div [ class "flex flex-row justify-center items-center" ]
        (List.indexedMap (\colIdx _ -> dot rowIdx colIdx) row)


dot : Int -> Int -> Html msg
dot rowIdx colIdx =
    let
        fillColor =
            getFillColor rowIdx colIdx
    in
    div [ class "w-full h-full flex justify-center items-center" ]
        [ svg [ width "44", height "44", viewBox "0 0 44 44" ]
            [ circle
                [ cx "22"
                , cy "22"
                , fill fillColor
                , r "22"
                , width "44"
                , height "44"
                ]
                []
            ]
        ]


getFillColor : Int -> Int -> String
getFillColor rowIdx colIdx =
    let
        red =
            toFloat (modBy 255 (10 * (rowIdx + colIdx)))

        green =
            toFloat (modBy 255 (12 * (rowIdx + colIdx)))
    in
    Color.fromRGB ( Debug.log "red" red, Debug.log "green" green, 54 )
        |> Color.toRGBString


square : Html msg
square =
    svg
        [ width "400"
        , height "400"
        , viewBox "0 0 400 400"
        ]
        [ rect
            [ x "10"
            , y "10"
            , fill "blue"
            , width "100"
            , height "100"
            , rx "2"
            , ry "2"
            ]
            []
        ]


update : Msg -> Model -> Model
update msg model =
    case msg of
        IncrementColNumber ->
            { model | colNumber = model.colNumber + 1 }

        DecrementColNumber ->
            { model | colNumber = model.colNumber - 1 }
