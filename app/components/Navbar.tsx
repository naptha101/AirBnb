
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import OIP from '../../public/R.png'
import { UserNav } from './UserNav'
import SearchComponent from './SearchComponent'


type Props = {}

const Navbar = (props: Props) => {

  // const path=usePathname();
  // console.log(path.includes('home'));
  return (
    
    <nav className='w-full border-b'>
        <div className='flex items-center justify-between container mx-auto px-5 lg:px-10 py-5'>
       <Link href={'/'}>
        <Image src={OIP} width={70} height={70} alt='Logo'></Image>
       </Link>
      <div className='px-5 py-2 border-1 border  rounded-xl '>
           <SearchComponent></SearchComponent>
        </div>
       <UserNav></UserNav>
        </div>
       

    </nav>
  )
}

export default Navbar