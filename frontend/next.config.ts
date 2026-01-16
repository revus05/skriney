import type { NextConfig } from 'next'

const apiUrl = process.env.NEXT_PUBLIC_API_URL!

const url = new URL(apiUrl)

console.log('================ NEXT_CONFIG ================')
console.log('NEXT_PUBLIC_API_URL', apiUrl)
console.log('protocol', url.protocol.slice(0, -1))
console.log('hostname', url.hostname)
console.log('port', url.port || '')
console.log('\n\n')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: url.protocol.slice(0, -1) as 'http' | 'https',
        hostname: url.hostname,
        port: url.port || '',
        pathname: '/files/**',
      },
    ],
  },
}

export default nextConfig
