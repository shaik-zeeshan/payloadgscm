import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Your Next.js config here
	experimental: {
		reactCompiler: false,
	},
	images: {
		unoptimized: true,
	},
};

export default withPayload(nextConfig);
