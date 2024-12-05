import React from 'react'
import "./Leftbar.css"
// import Profile from "../../Images/Profile.jpg"
// import Logo from "../../Images/movielogo.png"


export default function Leftbar() {
  return (
    <div className='LeftbarMainContainer'>
      
    
     <div>
        <p className='menu'>Menu</p>
        <ul>
            <li>
              <img src='' alt=''></img>
              <p className='listname'>Browse</p>

            </li>
            <li>
              <img src='' alt=''></img>
              <p className='listname'>Watching Lists</p>

            </li>
            <li> 
              <img src='' alt=''></img>
              <p className='listname'>Coming Soon!</p>

            </li>
            
        </ul>
     </div>

     <div>
        <p className='menu'>Social</p>
        <ul>
            <li>
              <img src='' alt=''></img>
              <p className='listname'>Friends</p>

            </li>
            <li>
              <img src='' alt=''></img>
              <p className='listname'>Parties</p>

            </li>    
        </ul>
     </div>

     <div>
        <p className='menu'>General</p>
        <ul>
            <li>
              <img src='' alt=''></img>
              <p className='listname'>Setting</p>

            </li>
            <li>
              <img src='' alt=''></img>
              <p className='listname'>Logout</p>

            </li>
           
            
        </ul>
     </div>
     <div className='ProfileLine'>
      
      <p className='UserName'>Your Name</p>
      <p className='viewingtime'>5/6hr viewing time</p>
      {/* <button className='btnProfile'>Profile</button> */}
     </div>
    </div>
  )
}
