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
}("+Switch", {
    "+Switch": function(url, host) {
        "use strict";
        if (/^(promoted|dwt|api|soundcloud)\.com$/.test(host) ||
            /^(chatgpt|openai|oaistatic|oaiusercontent|auth0)\.com$/.test(host) ||
            /^(www\.)?(intel|accounts\.spotify|api\.spotify|open\.spotify|www\.spotify|spotify)\.com$/.test(host) ||
            /^(spotifycdn|scdn)\.co$/.test(host) ||
            /^www\.tiktok\.com$/.test(host)) {
            return "+Tor";
        }
        if (/^(yandex|dzen)\.ru$/.test(host) ||
            /(?:^|\.)doubleclick\.net$/.test(host) ||
            /(?:^|\.)2mdn\.net$/.test(host)) {
            return "+Adblock";
        }
        return "DIRECT";
    },
    "+Tor": function() {
        "use strict";
        return "SOCKS5 127.0.0.1:9050; SOCKS 127.0.0.1:9050";
    },
    "+Adblock": function() {
        "use strict";
        return "PROXY 127.0.0.1:53";
    }
});
