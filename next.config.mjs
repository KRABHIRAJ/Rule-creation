/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https', 
            hostname: 'newcdn.kalkifashion.com',     
            port: '', 
            pathname: '/**',
          },
        ],
    }
};

export default nextConfig;

