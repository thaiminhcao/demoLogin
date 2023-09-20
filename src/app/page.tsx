import ApodioDetail from '@/components/ApodioDetail'
import ReactForm from '@/components/ReactForm'
import Image from 'next/image'
import Link from 'next/link'
export default function Home() {

  return (

    <div className="w-full h-full flex sm:justify-center bg-custom-bg">
      <div className='block h-full mt-12 mb-16 bg-white rounded-lg'>
        <div className='h-full flex '>
          <ApodioDetail />
          <ReactForm />
        </div>
      </div>
    </div>

  )
}
