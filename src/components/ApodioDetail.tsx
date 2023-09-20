import React from 'react'
import Image from 'next/image'
import apodioImg from '@/assets/images/save.png'
export default function ApodioDetail() {
    return (
        <div >
            <Image
                src={apodioImg}
                alt='apodio picture'
                width={600}
                height={700}
            >
            </Image>
        </div>
    )
}
