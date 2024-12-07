import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap'
import styles from  "./SearchBar.module.scss"
import { Autocomplete, FormControlLabel, Switch, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setData} from '../../features/WeatherSlice'
import { resetData} from '../../features/WeatherSlice'
import PositionSvg from '../Svgs/PositionSvg'






export default function SearchBar() {

 const GEO_API_KEY = "5fa3b69d2d6541fe9c1c90af2a0f9d72"
 const WEATHER_API="cbb7da2463b169417c4bd6896d2373d9"
 const dispatch = useDispatch()
 const [cities,setCities]=useState([])
 const [unity,setUnity]=useState('metric')
 const [geoLocation, setGeoLocation] = useState(undefined)
 const [isCurrentLocation, setIsCurrentLocation] = useState(false)



const getGeoLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
      setIsCurrentLocation(true)
      setGeoLocation({
          lon: position.coords.longitude,
          lat: position.coords.latitude,
      })
  })
}
    useEffect(() => {
        getGeoLocation()
    }, []);

    useEffect(() => {
      getData()
  }, [geoLocation]);


const handleInputChange=(e)=>{
  
 const {value}=e.currentTarget
fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=${GEO_API_KEY}`)
 .then(response =>response.json())
 .then(json => setCities(json.results.map(data =>{
  const {lat,lon,city,country,formatted}=data
  return { lat,lon,city,country,formatted}
 })))

}

   const getData = () => {
        if (geoLocation) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&units=${unity}&lon=${geoLocation.lon}&appid=${WEATHER_API}`)
                .then(response => response.json())
                .then(json => {
                    const {clouds, main, name, sys, weather, wind} = json
                    dispatch(setData({clouds, main, name, sys, weather, wind}))
                })
        }
    }


 const handleAutocopleteSelect=(e,value)=>{
  console.log(unity)
  if(value != null){
   const {lon, lat} = value
            setIsCurrentLocation(false)
            setGeoLocation({
                lon,
                lat,
            })

          }else{
    dispatch(resetData())
    
  }


 }

 

 const handleChangeSwitch=()=>{
  
  setUnity('imperial')

 }
  return <>
  <Form>

    <FormGroup className={styles.searchContainer}>

  <Autocomplete  className={styles.searhInput} clearOnBlur={false} getOptionLabel={(option)=>option.formatted} renderInput={(params)=>  <TextField onChange={handleInputChange} {...params} label={'Enter your City ...'}  />}  options={cities}  onChange={handleAutocopleteSelect}/>
        
        <Button disabled={geoLocation === undefined || isCurrentLocation === true} variant="contained"
                        onClick={() => getGeoLocation()}><PositionSvg color={'#fff'}/></Button>
     
<FormControlLabel control={<Switch  onChange={handleChangeSwitch} />} label="Celsius  to Fahrenheit" />
        
    </FormGroup>
    
  </Form>
  
  
  </>
}


