declare module 'next-pwa' {
  import type { NextConfig } from 'next'

  type NextPWAOptions = {
    dest?: string
    disable?: boolean
    register?: boolean
    skipWaiting?: boolean
    buildExcludes?: string[]
    [key: string]: any
  }

  export default function withPWA(
    options?: NextPWAOptions
  ): (nextConfig: NextConfig) => NextConfig
}
