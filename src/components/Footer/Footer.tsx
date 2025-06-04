import Link from 'next/link'
import React from 'react'
import { FaGithub,  FaYoutube, FaInstagram } from 'react-icons/fa'
function Footer() {
  return (
   <footer>
  <div className=" bg-[#232F3E] mx-auto py-10">
    <ul className="flex justify-center flex-wrap text-sm text-white">
      <li className="mx-2"><Link href="#" className=" py-2 px-3"> <FaGithub className='w-5 h-5'/> </Link></li>
      <li className="mx-2"><Link href="#" className=" py-2 px-3"><FaYoutube className='w-5 h-5'/></Link></li>
      <li className="mx-2"><Link href="#" className=" py-2 px-3"> <FaInstagram className='w-5 h-5'/> </Link></li>
    </ul>
    <hr className="my-4" />
    <p className="text-center text-sm text-white">&copy; 2025  Created By Vaqsi</p>
  </div>
</footer>
  )
}

export default Footer