import React from 'react'
import Nav from './components/Nav/Nav'
import { Routes, Route, Router } from 'react-router-dom'
import Home from './components/Home/Home'
import './App.css'
import fras_logo from './components/images/fras_logo.png'
import Login from './components/Login/Login'
import Map from './components/Map/Map'
import Graphs from './components/Graphs/Graphs'
import Complain from './components/Complain/Complain'
import Track from './components/Track/Track'
import Register from './components/Register/Register'
import AddData from './components/AddInformation/AddData'
import PrivatePage from './components/Private/PrivatePage'
import TAid from './components/Aids/TAid'
import Emer from './components/Emergency/Emer'
import Police from './components/Emergency/Police'
import Hospitals from './components/Emergency/Hospitals'
import Rescue from './components/Emergency/Rescue'
import Onetwo from './components/Emergency/Onetwo'
import Eidhi from './components/Emergency/Eidhi'
import Chippa from './components/Emergency/Chippa'
import Alkhid from './components/Emergency/Alkhid'
import Sayalani from './components/Emergency/Sayalani'
export default function App() {
  return (
    <div>
      <div className="App">

        <div id="topbar">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 p-3">
                <div className="row">
                  <div className="col-sm-2">
                    <img src={fras_logo} alt="" className='d-block' />
                  </div>
                  <div className="col-sm-10">
                    <h2 className='mt-3'><i class="fa-solid fa-house-flood-water"></i> Flood Relief Analysis System</h2>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>


        <div id="wrapper">
          <div className="container">
            <div className="row">

              <div className="col-sm-3 m-0 p-0">
                <Nav />
              </div>
              <div className="col-sm-9 m-0 p-0">
             
                  <Routes>
                  <Route path='/' element={<Home />} />
                    
                    <Route path='/map' element={<Map />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/trackAid' element={<Track />} />
                    <Route path='/tAid' element={<TAid />} />
                    <Route path='/graphs' element={<Graphs />} />
                    <Route path='/complain' element={<Complain />} />
                    <Route path='/complain' element={<Complain />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />

                      <Route path='/emer' element={<Emer />}>
                             <Route index element={<Police />}/>
                             <Route path='police' element={<Police />}/>
                             <Route path='hospitals' element={<Hospitals />}/>
                             <Route path='rescue' element={<Rescue />}>
                                       <Route index  element={<Onetwo/>}/>
                                       <Route path='oott'  element={<Onetwo/>}/>
                                       <Route  path='eidhi' element={<Eidhi/>}/>
                                       <Route  path='chippa' element={<Chippa/>}/>
                                       <Route  path='alkhid' element={<Alkhid/>}/>
                                       <Route  path='sayalani' element={<Sayalani/>}/>
                             </Route>
                      </Route> 

                      
                    <Route path='/police' element={<Police />} />

                    <Route path="/" element={<PrivatePage/>}>
                       <Route path='AddData' element={<AddData />} />
                    </Route>

                  </Routes>
                


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
