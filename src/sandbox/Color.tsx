import React, {useState, useEffect} from 'react';
import * as lodash from 'lodash'
import './Color.scss'

const Color = () => {

  type RGB = {
    r: number,
    g: number,
    b: number
  }
  type LMS = {
    l: number,
    m: number,
    s: number
  }
  type Matrix = [
    number,
    number,
    number
  ]
  type ColorVisionMatrix = [
    number, number, number,
    number, number, number,
    number, number, number
  ]

  const [color, setColor] = useState<RGB[]>([
    {r: 213, g: 0, b: 0},{r: 213, g: 0, b: 0},
    {r:255 , g:214 , b:0 },{r:255 , g:214 , b:0 },
    {r: 27, g: 94, b: 32},{r: 27, g: 94, b: 32},
    {r:41 , g:98 , b:255 },{r:41 , g:98 , b:255 }
  ])
  const [style, setStyle] = useState<any>([{},{},{},{},{},{},{},{}])
  useEffect(() => {
    console.log(color)
    const tmpStyle = {
      border: '#fff',
      color: '#fff',
      margin: '0 20px',
      padding: '0 14px',
      height: '75px',
      width: '200px',
      lineHeight: '75px',
      background: 'black'
    }

    const tmpRed1Style = lodash.cloneDeep(tmpStyle)
    const tmpRed2Style = lodash.cloneDeep(tmpStyle)
    const tmpYellow1Style = lodash.cloneDeep(tmpStyle)
    const tmpYellow2Style = lodash.cloneDeep(tmpStyle)
    const tmpGreen1Style = lodash.cloneDeep(tmpStyle)
    const tmpGreen2Style = lodash.cloneDeep(tmpStyle)
    const tmpBlue1Style = lodash.cloneDeep(tmpStyle)
    const tmpBlue2Style = lodash.cloneDeep(tmpStyle)
    tmpRed1Style['background'] = `rgb(${color[0].r}, ${color[0].g}, ${color[0].b})`
    tmpRed2Style['background'] = `rgb(${color[1].r}, ${color[1].g}, ${color[1].b})`
    tmpYellow1Style['background'] = `rgb(${color[2].r}, ${color[2].g}, ${color[2].b})`
    tmpYellow2Style['background'] = `rgb(${color[3].r}, ${color[3].g}, ${color[3].b})`
    tmpGreen1Style['background'] = `rgb(${color[4].r}, ${color[4].g}, ${color[4].b})`
    tmpGreen2Style['background'] = `rgb(${color[5].r}, ${color[5].g}, ${color[5].b})`
    tmpBlue1Style['background'] = `rgb(${color[6].r}, ${color[6].g}, ${color[6].b})`
    tmpBlue2Style['background'] = `rgb(${color[7].r}, ${color[7].g}, ${color[7].b})`

    setStyle([
      tmpRed1Style,
      tmpRed2Style,
      tmpYellow1Style,
      tmpYellow2Style,
      tmpGreen1Style,
      tmpGreen2Style,
      tmpBlue1Style,
      tmpBlue2Style
    ])
  }, [color])

  const RGB_TO_MATRIX = [
    0.31399022, 0.63951294, 0.04649755,
    0.15537241, 0.75789446, 0.08670142,
    0.01775239, 0.10944209, 0.87256922,
  ]
  const LMS_TO_RGB_MATRIX = [
    5.47221206, -4.6419601, 0.16963708,
    -1.1252419, 2.29317094, -0.1678952,
    0.02980165, -0.19318073, 1.16364789,
  ]

  const PROTANOPIA_SIM = [
    0.0, 1.05118294, -0.05116099,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0,
  ]
  const DEUTERANOPIA_SIM = [
    1.0, 0.0, 0.0,
    0.9513092, 0.0, 0.04866992,
    0.0, 0.0, 1.0,
  ]
  const TRITANOPIA_SIM = [
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    -0.86744736, 1.86727089, 0.0,
  ]
  const ACHROMATOPSIA_SIM = [
    0.212656, 0.715158, 0.072186,
  ]

  const reset = () => {
    setColor([
      {r: 213, g: 0, b: 0},{r: 213, g: 0, b: 0},
      {r:255 , g:214 , b:0 },{r:255 , g:214 , b:0 },
      {r: 27, g: 94, b: 32},{r: 27, g: 94, b: 32},
      {r:41 , g:98 , b:255 },{r:41 , g:98 , b:255 }
    ])
  }

  const simulate: any = (colorVisionMatrix: ColorVisionMatrix) => {
    console.log('simulate!');

    //const rgb: RGB = 
    const sim = (rgb: RGB) => {
      const rgbMatrix: Matrix = [
        rgb.r / 255,
        rgb.g / 255,
        rgb.b / 255
      ]

      //const lmsMatrix = multiplyMatrix3x3And3x1(RGB_TO_MATRIX, rgbMatrix)
      const lmsMatrix: Matrix = [
        RGB_TO_MATRIX[0] * rgbMatrix[0] + RGB_TO_MATRIX[1] * rgbMatrix[1] + RGB_TO_MATRIX[2] * rgbMatrix[2],
        RGB_TO_MATRIX[3] * rgbMatrix[0] + RGB_TO_MATRIX[4] * rgbMatrix[1] + RGB_TO_MATRIX[5] * rgbMatrix[2],
        RGB_TO_MATRIX[6] * rgbMatrix[0] + RGB_TO_MATRIX[7] * rgbMatrix[1] + RGB_TO_MATRIX[8] * rgbMatrix[2],
      ]
      const simLmsMatrix: Matrix = [
        colorVisionMatrix[0] * lmsMatrix[0] + colorVisionMatrix[1] * lmsMatrix[1] + colorVisionMatrix[2] * lmsMatrix[2],
        colorVisionMatrix[3] * lmsMatrix[0] + colorVisionMatrix[4] * lmsMatrix[1] + colorVisionMatrix[5] * lmsMatrix[2],
        colorVisionMatrix[6] * lmsMatrix[0] + colorVisionMatrix[7] * lmsMatrix[1] + colorVisionMatrix[8] * lmsMatrix[2],
      ]
      const simRgbMatrix: Matrix = [
        LMS_TO_RGB_MATRIX[0] * simLmsMatrix[0] + LMS_TO_RGB_MATRIX[1] * simLmsMatrix[1] + LMS_TO_RGB_MATRIX[2] * simLmsMatrix[2],
        LMS_TO_RGB_MATRIX[3] * simLmsMatrix[0] + LMS_TO_RGB_MATRIX[4] * simLmsMatrix[1] + LMS_TO_RGB_MATRIX[5] * simLmsMatrix[2],
        LMS_TO_RGB_MATRIX[6] * simLmsMatrix[0] + LMS_TO_RGB_MATRIX[7] * simLmsMatrix[1] + LMS_TO_RGB_MATRIX[8] * simLmsMatrix[2],
      ]
      const simRgb: RGB = {
        r: simRgbMatrix[0] * 255,
        g: simRgbMatrix[1] * 255,
        b: simRgbMatrix[2] * 255
      }
      const snitizedSimRgb: RGB = {
        r: Math.round(Math.min(Math.max(simRgb.r, 0), 255)),
        g: Math.round(Math.min(Math.max(simRgb.g, 0), 255)),
        b: Math.round(Math.min(Math.max(simRgb.b, 0), 255))
      }
      console.log(snitizedSimRgb);
      return snitizedSimRgb;
    }
    const tmpRedColor = sim(color[0])
    const tmpYellowColor = sim(color[2])
    const tmpGreenColor = sim(color[4])
    const tmpBlueColor = sim(color[6])
    setColor([
      color[0],
      tmpRedColor,
      color[2],
      tmpYellowColor,
      color[4],
      tmpGreenColor,
      color[6],
      tmpBlueColor
    ])
  }

  const simulateAchromatopsia: any = (colorVisionMatrix: ColorVisionMatrix) => {
    const sim = (rgb: RGB) => {
      const rgbMatrix: Matrix = [
        rgb.r / 255,
        rgb.g / 255,
        rgb.b / 255
      ]

      const simRgbValue = [rgbMatrix[0] * ACHROMATOPSIA_SIM[0] + rgbMatrix[1] * ACHROMATOPSIA_SIM[1] + rgbMatrix[2] * ACHROMATOPSIA_SIM[2]]

      const simRgbMatrix = Array(3).fill(simRgbValue)

      const simRgb: RGB = {
        r: simRgbMatrix[0] * 255,
        g: simRgbMatrix[1] * 255,
        b: simRgbMatrix[2] * 255
      }
      const snitizedSimRgb: RGB = {
        r: Math.round(Math.min(Math.max(simRgb.r, 0), 255)),
        g: Math.round(Math.min(Math.max(simRgb.g, 0), 255)),
        b: Math.round(Math.min(Math.max(simRgb.b, 0), 255))
      }
      return snitizedSimRgb;
    }
    const tmpRedColor = sim(color[0])
    const tmpYellowColor = sim(color[2])
    const tmpGreenColor = sim(color[4])
    const tmpBlueColor = sim(color[6])
    setColor([
      color[0],
      tmpRedColor,
      color[2],
      tmpYellowColor,
      color[4],
      tmpGreenColor,
      color[6],
      tmpBlueColor
    ])
  }

  return (
    <div>
      <h1 className="title">COLOR</h1>
      <button onClick={reset}>RESET</button>
      <div className="ButtonWrapper">
        <button onClick={() => {simulate(PROTANOPIA_SIM)}}>PROTANOPIA</button>
        <button onClick={() => {simulate(DEUTERANOPIA_SIM)}}>DEUTERANOPIA</button>
        <button onClick={() => {simulate(TRITANOPIA_SIM)}}>TRITANOPIA</button>
        <button onClick={() => {simulateAchromatopsia()}}>ACHROMATOPSIA</button>
      </div>
      <div className="BalletWrapper">
        <div style={style[0]}>Red</div>
        <div style={style[1]}>Red to ...</div>
      </div>
      <div className="BalletWrapper">
        <div style={style[2]}>Yellow.</div>
        <div style={style[3]}>Yellow to ...</div>
      </div>
      <div className="BalletWrapper">
        <div style={style[4]}>Green</div>
        <div style={style[5]}>Green to ...</div>
      </div>
      <div className="BalletWrapper">
        <div style={style[6]}>Blue</div>
        <div style={style[7]}>Blue to ...</div>
      </div>
    </div>
  )
}

export default Color;
