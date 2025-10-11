'use client';
import React from 'react'
import Image from 'next/image'

function Loading() {
  return (
    <div  className='loading-page'>
        <Image src="/loading-image.png" alt="Loading" width={300} height={300} />
        <h3>Loading ...</h3>
    </div>
  )
}

export default Loading