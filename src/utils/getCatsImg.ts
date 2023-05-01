import day from '../assets/kittens_2_png/458656664/106.png'
import night from '../assets/kittens_2_png/01n.png'
import cloudDay from '../assets/kittens_2_png/cd.png'
import cloudNight from '../assets/kittens_2_png/458656664/92.png'
import cloud from '../assets/kittens_2_png/458656664/5.png'
import cloud4d from '../assets/kittens_2_png/04d.png'
import cloud4n from '../assets/kittens_2_png/04n.png'
import rain9d from '../assets/kittens_2_png/458656664/09d.png'
import rain9n from '../assets/kittens_2_png/458656664/09n.png'
import rain10d from '../assets/kittens_2_png/458656664/10d.png'
import rain10n from '../assets/kittens_2_png/458656664/10n.png'
import snowD from '../assets/kittens_2_png/13d.png'
import snowN from '../assets/kittens_2_png/13n.png'
import fog from '../assets/kittens_2_png/458656664/60.png'

import { IconType } from '../@types/IconType'

 const weatherIcons = {
  "01d": day,
  "01n": night,
  "02d": cloudDay,
  "02n": cloudNight,
  "03d": cloud,
  "03n": cloud,
  "04d": cloud4d,
  "04n": cloud4n,
  "09d": rain9d,
  "09n": rain9n,
  "10d": rain10d,
  "10n": rain10n,
  "11d": rain10d,
  "11n": rain9d,
  "13d": snowD,
  "13n": snowN,
  "50d": fog,
  "50n": fog,
};

export function getCatsImg(weatherCode:IconType) {
    return weatherIcons[weatherCode] 
  }