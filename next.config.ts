// =============================
// file: next.config.mjs (autoriser les images externes Unsplash pour next/image)
// =============================
/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
remotePatterns: [
{ protocol: 'https', hostname: 'images.unsplash.com' },
],
},
};
export default nextConfig;