module Squares.Main exposing (..)

import Browser
import Browser.Dom exposing (Viewport, getViewport)
import Color
import Html exposing (Html, button, div, p, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Svg exposing (circle, rect, svg)
import Svg.Attributes exposing (cx, cy, fill, height, r, rx, ry, viewBox, width, x, y)
import Task


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }


type alias Model =
    { viewport : Maybe Viewport
    , colNumber : Int
    }


type Msg
    = GotViewport Viewport
    | IncrementColNumber
    | DecrementColNumber


init : () -> ( Model, Cmd Msg )
init flags =
    ( { viewport = Nothing, colNumber = 6 }, Task.perform GotViewport getViewport )


view : Model -> Html Msg
view model =
    let
        buttonStyle =
            "mr-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    in
    case model.viewport of
        Just viewport ->
            div [ class "p-32" ]
                [ div []
                    [ button [ class buttonStyle, onClick IncrementColNumber ] [ text "+" ]
                    , button [ class buttonStyle, onClick DecrementColNumber ] [ text "-" ]
                    ]
                , art viewport model.colNumber
                ]

        Nothing ->
            div [] [ text "loading..." ]


art : Viewport -> Int -> Html Msg
art viewport colNumber =
    let
        { width, height } =
            viewport.viewport

        m =
            min width height

        w =
            floor <| m / toFloat (colNumber * 2)
    in
    div [ class "grid my-vmin m-auto border-2" ] (listOfDots w colNumber)


listOfDots : Int -> Int -> List (Html msg)
listOfDots w count =
    let
        baseMatrix =
            List.repeat count (List.repeat count 0)
    in
    List.indexedMap (\rowIdx row -> rowToDots w rowIdx row) baseMatrix


rowToDots : Int -> Int -> List a -> Html msg
rowToDots w rowIdx row =
    div [ class "flex flex-row" ]
        (List.indexedMap (\colIdx _ -> dot w rowIdx colIdx) row)


dot : Int -> Int -> Int -> Html msg
dot w rowIdx colIdx =
    let
        fillColor =
            getFillColor rowIdx colIdx

        wString =
            String.fromInt w

        rString =
            String.fromInt (w // 2)
    in
    div [ class "w-full h-full flex justify-center items-center" ]
        [ svg [ width wString, height wString, viewBox ("0 0 " ++ wString ++ " " ++ wString) ]
            [ circle
                [ cx rString
                , cy rString
                , fill fillColor
                , r rString
                , width <| String.fromInt w
                , height <| String.fromInt w
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
    Color.fromRGB ( red, green, 60 )
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


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotViewport viewport ->
            ( { model | viewport = Just viewport }, Cmd.none )

        IncrementColNumber ->
            ( { model | colNumber = model.colNumber + 1 }, Cmd.none )

        DecrementColNumber ->
            ( { model | colNumber = model.colNumber - 1 }, Cmd.none )
