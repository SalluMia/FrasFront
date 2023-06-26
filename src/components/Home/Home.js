import React from 'react'
import flood from '../images/flood.jpg'
import style from './style.css'
import Slider from '../Carousel/Slider'
export default function Home() {
  

  return (
    <div>
       <Slider/>
           <div className="container bg-light jumbotron p-4 ">
              <div className="col-sm-12 m-0" id='home'>
                  
                   {/* <img src={flood} className='d-block w-100' alt="" /> */}
              </div>
                  <div className="col-sm-12 mt-3">
                    <p>
                    Floods are a frequent natural disaster that can cause devastating effects,
                     such as loss of life and damage to property and public infrastructure.
                      In Pakistan, floods have caused significant damage and humanitarian needs 
                      in many districts, leaving thousands homeless and many dead. The beauty of
                       northern areas has also been severely affected, impacting Pakistan's tourism
                        industry. In response to these situations, we have developed a web-based information 
                        system that will help people analyze the weather situation, make necessary precautions, and help flood victims.
                    </p>

                    <p>
                  Our system will provide reports and graphs on the number of homeless people and the required items, such as clothes and food, to help those in need. Through our website, people from other areas can help by providing the necessary items to support the flood victims. Our system aims to provide an effective solution to mitigate the impact of floods and help people in need.

                     </p>
                     <button className='btn btn-info' id='readmore'>Read More <i class="fa-solid fa-angles-right"></i></button>
                  </div>
                 

           </div>
    </div>
  )
}
