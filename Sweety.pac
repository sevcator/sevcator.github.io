var FindProxyForURL = function(init, profiles) {
    return function(url, host) {
        "use strict";
        var result = init, scheme = url.substr(0, url.indexOf(":"));
        do {
            result = profiles[result];
            if (typeof result === "function") result = result(url, host, scheme);
        } while (typeof result !== "string" || result.charCodeAt(0) === 43);
        return result;
    };
}("+auto switch", {
    "+auto switch": function(url, host, scheme) {
        "use strict";
        // Define proxy hosts
        const proxyHosts = [
            // SoundCloud
            /(?:^|\.)soundcloud\.com$/,
            /(?:^|\.)sndcdn\.com$/,
            /(?:^|\.)soundcloud\.cloud$/,

            // ChatGPT/OpenAI
            /(?:^|\.)openai\.com$/,
            /(?:^|\.)chatgpt\.com$/,
            /(?:^|\.)oaistatic\.com$/,
            /(?:^|\.)oaiusercontent\.com$/,
            /(?:^|\.)auth0\.com$/,

            // Spotify
            /^www\.spotify\.com$/,
            /^spotify\.com$/,
            /^accounts\.spotify\.com$/,
            /^api\.spotify\.com$/,
            /^login\.spotify\.com$/,
            /^login\.app\.spotify\.com$/,
            /^open\.spotify\.com$/,
            /(?:^|\.)spotifycdn\.com$/,
            /(?:^|\.)scdn\.co$/,
            /(?:^|\.)gstatic\.com$/,

            // 4pda
            /(?:^|\.)4pda\.to$/
        ];

        // Match host with proxy hosts
        if (proxyHosts.some(regex => regex.test(host))) {
            return "+proxy";
        }

        return "DIRECT";
    },
    "+proxy": function(url, host, scheme) {
        "use strict";
        return "SOCKS5 localhost:9050; SOCKS localhost:9050";
    }
});
