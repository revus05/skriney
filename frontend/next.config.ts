import type { NextConfig } from 'next'

const apiUrl = process.env.NEXT_PUBLIC_API_URL!

const url = new URL(apiUrl)

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: url.protocol.slice(0, -1) as 'http' | 'https',
        hostname: url.hostname,
        port: url.port || '',
      },
    ],
  },
}

export default nextConfig
