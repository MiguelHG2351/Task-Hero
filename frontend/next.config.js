/**
 * @type {import('next').NextConfig}
 */

 const nextConfig = {
    poweredByHeader: false,
    experimental: { images: { allowFutureImage: true } }
}

module.exports = nextConfig