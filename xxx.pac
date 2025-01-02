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
}("+s", {
    "+s": function(url, host, scheme) {
        "use strict";
        if (/^promoted\.soundcloud\.com$/.test(host)) return "+proxy";
        if (/^dwt\.soundcloud\.com$/.test(host)) return "+proxy";
        if (/^api.*\.soundcloud\.com$/.test(host)) return "+proxy";
        if (/chatgpt\.com$/.test(host)) return "+proxy";
        if (/openai\.com$/.test(host)) return "+proxy";
        if (/oaistatic\.com$/.test(host)) return "+proxy";
        if (/oaiusercontent\.com$/.test(host)) return "+proxy";
        if (/auth0\.com$/.test(host)) return "+proxy";
        if (/^www\.tiktok\.com$/.test(host)) return "+proxy";
        if (/^www\.intel\.com$/.test(host)) return "+proxy";
        if (/^accounts\.spotify\.com$/.test(host)) return "+proxy";
        if (/^api\.spotify\.com$/.test(host)) return "+proxy";
        if (/^open\.spotify\.com$/.test(host)) return "+proxy";
        if (/^www\.spotify\.com$/.test(host)) return "+proxy";
        if (/^spotify\.com$/.test(host)) return "+proxy";
        if (/spotifycdn\.com$/.test(host)) return "+proxy";
        if (/scdn\.co$/.test(host)) return "+proxy";
        return "DIRECT";
    },
    "+proxy": function(url, host, scheme) {
        "use strict";
        return "SOCKS5 127.0.0.1:9050; SOCKS 127.0.0.1:9050";
    }
});
