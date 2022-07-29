/**
 * @type {import('next').NextConfig}
 */

 const nextConfig = {
    poweredByHeader: false,
    experimental: { images: { allowFutureImage: true } },
    images: {
        // firebase
        domains: ["firebasestorage.googleapis.com"],
    }
}

module.exports = nextConfig