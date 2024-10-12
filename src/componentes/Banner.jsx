
"use client";

import { Carousel } from "flowbite-react";

import Slide1 from "./imagenesBanner/img1.png";
import Slide2 from "./imagenesBanner/img2.png";
import Slide3 from "./imagenesBanner/img3.png";


export function Banner() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel pauseOnHover>
        <div>
         <iframe width="100%" height="400" src="https://www.youtube.com/embed/y2wZ_iWJfCU?si=23hU5b0kWfREdh0P" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <img src={Slide1} alt="..."  />
        <img src={Slide2} alt="..." />
        <img src={Slide3} alt="..." />
        
        
      </Carousel>
    </div>
  );
}
