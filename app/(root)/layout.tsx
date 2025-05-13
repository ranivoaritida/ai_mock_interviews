import Link from 'next/link'
import{ ReactNode } from 'react'
import Image  from "next/image";


const RootLayout = ({children}: {children : ReactNode}) => {
  return (
    <div className='root-layout'>
      <nav>
      
        <Link href='/' className='flex item-center gap-2'>
          <Image src="/logo.svg" alt="Logo" width={38} height={32}/>
          <h2 className='text-promary-100'>PrepWise</h2>
        </Link>
      </nav>
      {children}
    </div>
  )
}

export default RootLayout