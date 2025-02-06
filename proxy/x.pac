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
    "+Switch": function(url, host, scheme) {
        "use strict";
        if (/(?:^|\.)soundcloud\.com$/.test(host)) return "+Tor";
        if (/(?:^|\.)chatgpt\.com$/.test(host)) return "+Tor";
        if (/(?:^|\.)openai\.com$/.test(host)) return "+Tor";
        if (/(?:^|\.)oaistatic\.com$/.test(host)) return "+Tor";
        if (/(?:^|\.)oaiusercontent\.com$/.test(host)) return "+Tor";
        if (/(?:^|\.)auth0\.com$/.test(host)) return "+Tor";
        if (/(?:^|\.)spotify\.com$/.test(host)) return "+Tor";
        if (/(?:^|\.)spotifycdn\.com$/.test(host)) return "+Tor";
        if (/(?:^|\.)scdn\.co$/.test(host)) return "+Tor";
        if (/^4pda\.to$/.test(host)) return "+Tor";
        if (/(?:^|\.)yandex\.ru$/.test(host)) return "+Adblock";
        if (/(?:^|\.)dzen\.ru$/.test(host)) return "+Adblock";
        if (/yandex\.ru$/.test(host)) return "+Adblock";
        if (/dzen\.ru$/.test(host)) return "+Adblock";
        return "DIRECT";
    },
    "+Tor": function(url, host, scheme) {
        "use strict";
        return "SOCKS5 127.0.0.1:9050; SOCKS 127.0.0.1:9050";
    },
    "+Adblock": function(url, host, scheme) {
        "use strict";
        return "PROXY 127.0.0.1:53";
    }
});
