import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"assets.coingecko.com"
      },{
        protocol:"https",
        hostname:"coin-image.coingecko.com"
      }
    ]
  }
  /* config options here */
};

export default nextConfig;
