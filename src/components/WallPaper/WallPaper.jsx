import React from 'react'
import './WallPaper.scss'
import img from '../../assets/images/wallpaper.jpg'
export default function WallPaper() {
  return (
<>
<div  className=' wallpaper-container  position-fixed d-flex top-0 botoom-0 end-0 start-0'>
        <img className='wallpaper' src={img} alt="bacround" />
    </div>
</>
  )
}
