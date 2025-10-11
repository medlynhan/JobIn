'use client';
import React from 'react'
import Image from 'next/image'

function Loading() {
  return (
    <div  className='loading-page'>
        <Image src="/loading-image.png" alt="Loading" width={200} height={200} />
        <h3>Loading ...</h3>
    </div>
  )
}

export default Loading