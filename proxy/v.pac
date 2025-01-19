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
        if (/^promoted\.soundcloud\.com$/.test(host)) return "+Tor";
        if (/^dwt\.soundcloud\.com$/.test(host)) return "+Tor";
        if (/^api.*\.soundcloud\.com$/.test(host)) return "+Tor";
        if (/^soundcloud\.com$/.test(host)) return "+Tor";
        if (/chatgpt\.com$/.test(host)) return "+Tor";
        if (/openai\.com$/.test(host)) return "+Tor";
        if (/oaistatic\.com$/.test(host)) return "+Tor";
        if (/oaiusercontent\.com$/.test(host)) return "+Tor";
        if (/auth0\.com$/.test(host)) return "+Tor";
        if (/^www\.intel\.com$/.test(host)) return "+Tor";
        if (/^accounts\.spotify\.com$/.test(host)) return "+Tor";
        if (/^api\.spotify\.com$/.test(host)) return "+Tor";
        if (/^open\.spotify\.com$/.test(host)) return "+Tor";
        if (/^www\.spotify\.com$/.test(host)) return "+Tor";
        if (/^spotify\.com$/.test(host)) return "+Tor";
        if (/spotifycdn\.com$/.test(host)) return "+Tor";
        if (/scdn\.co$/.test(host)) return "+Tor";
        if (/^4pda\.to$/.test(host)) return "+Tor";
        if (/tiktok\.com$/.test(host)) return "+Tor";
        if (/tiktokcdn\.com$/.test(host)) return "+Tor";
        if (/tiktokcdn-us\.com$/.test(host)) return "+Tor";
        if (/tiktokcdn-eu\.com$/.test(host)) return "+Tor";
        if (/tiktokv\.com$/.test(host)) return "+Tor";
        if (/tiktokv\.us$/.test(host)) return "+Tor";
        if (/ttlivecdn\.com$/.test(host)) return "+Tor";
        if (/yandex\.ru$/.test(host)) return "+Adblock";
        if (/dzen\.ru$/.test(host)) return "+Adblock";
        if (/(?:^|\.)doubleclick\.net$/.test(host)) return "+Adblock";
        if (/(?:^|\.)2mdn\.net$/.test(host)) return "+Adblock";
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
