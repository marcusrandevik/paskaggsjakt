import { Clue } from '../types';

export const CLUES: Clue[] = [
  {
    id: 1,
    title: "Sjörövarnas hamn",
    image: "maps/map1.jpeg",
    alt: "Vintage hand-drawn map of Whispering Pines",
    correctLetter: "A",
    hint: "En hamn med utsikt över vita sand"
  },
  {
    id: 2,
    title: "Det stora fältet",
    image: "maps/map2.jpg",
    alt: "Weathered nautical map of The Sunken Grotto",
    correctLetter: "B",
    hint: "Här finns många stigar för den som är ute och går"
  },
  {
    id: 3,
    title: "Berget vid havet",
    image: "maps/map3.jpeg",
    alt: "Ancient map scroll of Hollow Hill",
    correctLetter: "C",
    hint: "Utsikten från detta berg är svårslagen"
  },
  {
    id: 4,
    title: "Ängen och bergt",
    image: "maps/map4.jpeg",
    alt: "Aerial forest map of Amber Archway",
    correctLetter: "D",
    hint: "På ängen i närheten är det på sommaren fullt av barn som rest hit."
  },
  {
    id: 5,
    title: "Skogen med spelplanen",
    image: "maps/map5.jpg",
    alt: "Skogen med spelplanen",
    correctLetter: "E",
    hint: "Här finns många stigar för den som är ute och går"
  }
];

export const CORRECT_FINAL_WORD = "ABCDE";
