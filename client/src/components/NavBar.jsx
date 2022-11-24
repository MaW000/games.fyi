import React from 'react'


export const NavBar = (props) => {
  return (
    <div className='block mx-auto my-0 max-w-5xl'>
    <header className=" align-center text-center bg-[#233056] ">
      <div className='pt-3 '>
        <a href="/" className="flex justify-center">
          <img className="" src='https://nodejs.org/static/images/logo.svg' alt='Nodejs' width="122" height="75"/>
        </a>
        <nav className='inline min-w-max'>
          <ul className='text-[#ccc] list-disc'>
            <li className='inline font-normal font-source text-sm px-2'>HOME</li>
            <li before="|"className='inline font-normal font-source text-sm  before:content-[attr(before)] before:pr-[6px] before:pl-[2px] '>ABOUT</li>
            <li before="|" className='inline font-normal font-source text-sm  before:content-[attr(before)] before:text-[#999] before:pr-[6px] before:pl-[2px]'>DOWNLOADS</li>
            <li before="|" className='inline font-normal font-source text-sm  before:content-[attr(before)] before:pr-[6px] before:pl-[2px]'>DOCS</li>
            <li before="|" className='inline font-normal font-source text-sm  before:content-[attr(before)] before:pr-[6px] before:pl-[2px]'>GET INVOLVED</li>
            <li before="|" className='inline font-normal font-source text-sm  before:content-[attr(before)] before:pr-[6px] before:pl-[2px]'>SECURITY</li>
            <li before="|" className='inline font-normal font-source text-sm  before:content-[attr(before)] before:pr-[6px] before:pl-[2px]'>CERTIFICATION</li>
            <li before="|" className='inline font-normal font-source text-sm  before:content-[attr(before)] before:pr-[6px] before:pl-[2px]' >NEWS</li>
          </ul>
        </nav>
        
      </div>
    </header>
    </div>
  )
}


export default NavBar