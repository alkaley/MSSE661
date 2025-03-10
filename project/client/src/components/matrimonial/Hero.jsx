import React from 'react'
import Navbar from './Navbar'
import Image from 'next/image'

export const Hero = () => {
  return (
    <>
      <section className="relative matrimonial_Image" id="HERO">
        <Navbar />
        <div className="custom_container">
          <div className="relative z-10 flex flex-col top-[0px] h-full md:px-4  items-center py-[20px]
           min-[768px]:py-0
          ">
            <div className="text-left">
              <p className='whitespace-nowrap text-left font-[genkaimincho] font-normal text-[#7a1a4a] lg:leading-[normal] text-[20px] 
                min-[768px]:text-[26px]  min-[1366px]:text-[25px]  min-[1666px]:text-[32px] min-[1800px]:text-[35px] min-[1800px]:pt-[px]
              '>
                Presents
              </p>
              <div className="text-left relative">
                <h1 id="MATRIMONIAL_SERVICE" className="text-left font-[genkaimincho] font-normal text-black  md:leading-[normal] 
                text-[30px]  min-[768px]:text-[40px] min-[1366px]:text-[44px] min-[1536px]:text-[44px]  min-[1666px]:text-[52px]  min-[1800px]:text-[68px]
                 ">
                  Matrimonial
                </h1>
                <div className="h-[2px] mr-auto bg-[black] w-[250px] min-[768px]:w-[330px] min-[1024px]:w-[350px] min-[1366px]:w-[360px]   min-[1666px]:w-[440px]  min-[1800px]:w-[600px] "></div>
                {/* <svg className="Line_1" viewBox="0 0 680 2.5">
                  <path id="Line_1" d="M 0 2.5 L 680 0" >
                  </path>
                </svg> */}
              </div>
              <h2 id="Matrimonial" className="whitespace-nowrap text-center font-[genkaimincho] font-normal text-[#841c32] text-[20px] 
                min-[768px]:text-[26px]  min-[1366px]:text-[26px]  min-[1666px]:text-[32px] min-[1800px]:text-[40px]
              ">
                MATRIMONIAL SERVICE
              </h2>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
