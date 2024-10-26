/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ftp.goit.study",
            },
        ],
    },
};

export default nextConfig;
