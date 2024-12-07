import React from 'react'
import styles from  './Weather.module.scss'
import { Card } from 'react-bootstrap'
import PositionSvg from '../Svgs/PositionSvg'
import DefaultWeather from '../Svgs/DefaultWeather'
import Thermometer from '../Svgs/Thermometer'
import Time  from '../Svgs/Time'
import Wind  from '../Svgs/Wind'
import Humidity  from '../Svgs/Humidity'
import Sunny  from '../Svgs/Sunny'
 import Cloudy from '../Svgs/Cloudy'
 import Rainy from '../Svgs/Rainy'
 import Thunder from '../Svgs/Thunder'
import SpeedoMeter  from '../Svgs/SpeedoMeter'
import { useSelector } from 'react-redux'
import Moment from 'react-moment'

export default function Weather() {

  const currentWeather= useSelector(({weather})=> weather )
  console.log(currentWeather)
  const displayIcon = () => {
    const defaultWidth = '200px';
    const defaultHeight = '200px';
    const number = '01'//currentWeather.weather.icon.substring(0, 2)
    switch (number) {
        case '01':
            return <Sunny width={defaultWidth} height={defaultHeight}/>
        case '03':
        case '04':
            return <Cloudy width={defaultWidth} height={defaultHeight}/>
        case '10':
            return <Rainy width={defaultWidth} height={defaultHeight}/>
        case '11':
            return <Thunder width={defaultWidth} height={defaultHeight}/>
        default:
            return <img src={`https://openweathermap.org/img/wn/${currentWeather.weather.icon}@2x.png`} alt=""/>
    }
}



  return<>

  <Card  className={styles.container}>
{  currentWeather.isLoaded ?
  <Card.Body>
    
    <Card.Title>{currentWeather.name}, {currentWeather.sys.country} <PositionSvg color={'rgba(225,225,255,0.7)' } />
    <div className={styles.date} >

     <div>
      <Moment format='MM dddd yy hh:mm ' /> 

     </div>
     <div> <Time/> </div>

    </div>

    </Card.Title>
    
    <Card.Text   as={'div'} className={styles.weatherInfos}>
       <div>
       {displayIcon()}
       </div>
       <div className={styles.temperature}>

        <div> {currentWeather.main.temp}° C </div>
        <div>  <Thermometer/> </div>

     </div>

   <div> 
   
      Good Morning  {currentWeather.name}
      <div className={styles.separator}></div>
   </div>
   
 
   <div className={styles.info}>

    <div className={"separator-right"}>
      <div><DefaultWeather color={'#fff'} /></div>
       <div>Sunrise</div>
      <div>
        <Moment unix={true} format='hh:mm'>
        {currentWeather.sys.sunrise}
        </Moment>
       </div>
    </div>

    <div className={"separator-right"}>
    <div> <Wind/> </div>
      <div>Wind</div>
      <div> {currentWeather.wind.speed} m/s</div>
    </div>

    <div className={"separator-right"}>
    <div> <SpeedoMeter color={'#fff'} /> </div>
      <div>Pressure</div>
      <div> {currentWeather.main.pressure} Pa </div>
    </div>

    <div className={"separator-right"}>
    <div> <Humidity color={'#fff'} /> </div>
      <div>Humidity</div>
      <div>{currentWeather.main.humidity} % </div>
    </div>

    <div>
    <div>  <Thermometer  width ={ '25px'} height = {'25px' }color = {'#fff'} /></div>
      <div>Temp</div>
      <div> {currentWeather.main.temp}° C</div>
    </div>

   </div>

    </Card.Text>
</Card.Body> 
:
<Card.Body>
  <Card.Title> Please choose your City</Card.Title>
</Card.Body>
}
  </Card>
  </>
}
