/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
	cpus: 1,
    },
    images: {
	remotePatterns: [
	    {
		protocol: "https",
		hostname: 'uniqueboutiquee2.s3.eu-west-2.amazonaws.com',
	    }
	]
    },

};
module.exports = nextConfig
