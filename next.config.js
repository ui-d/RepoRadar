/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        dirs: ['src'],
    },

    reactStrictMode: true,
    swcMinify: true,

    // Uncoment to add domain whitelist
    images: {
        domains: [
            'avatars.githubusercontent.com',
            'https://avatars.githubusercontent.com/u/6831355?v=4',
        ],
    },

    // SVGR
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        typescript: true,
                        icon: true,
                    },
                },
            ],
        })

        return config
    },
}

module.exports = nextConfig
