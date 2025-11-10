const withNextintl = require('next-intl/plugin')

module.exports = withNextintl({
    images: {
        remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
    ],
    }
})  