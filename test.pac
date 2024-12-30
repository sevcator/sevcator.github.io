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
}("+hosts", {
    "+hosts": function(url, host, scheme) {
        "use strict";
        if (/^soundcloud\.com$/.test(host)) return "+proxy";
        if (/^sndcdn\.com$/.test(host)) return "+proxy";
        if (/^soundcloud\.cloud$/.test(host)) return "+proxy";
        if (/(?:^|\.)soundcloud\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)sndcdn\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)soundcloud\.cloud$/.test(host)) return "+proxy";
        if (/^spotify\.com$/.test(host)) return "+proxy";
        if (/^www\.spotify\.com$/.test(host)) return "+proxy";
        if (/^accounts\.spotify\.com$/.test(host)) return "+proxy";
        if (/^api\.spotify\.com$/.test(host)) return "+proxy";
        if (/^open\.spotify\.com$/.test(host)) return "+proxy";
        if (/scdn\.co$/.test(host)) return "+proxy";
        if (/^openai\.com$/.test(host)) return "+proxy";
        if (/^chatgpt\.com$/.test(host)) return "+proxy";
        if (/^oaistatic\.com$/.test(host)) return "+proxy";
        if (/^oaiusercontent\.com$/.test(host)) return "+proxy";
        if (/^auth0\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)openai\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)chatgpt\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)oaistatic\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)oaiusercontent\.com$/.test(host)) return "+proxy";
        if (/(?:^|\.)auth0\.com$/.test(host)) return "+proxy";
        return "DIRECT";
    },
    "+proxy": function(url, host, scheme) {
        "use strict";
        if (/^127\.0\.0\.1$/.test(host) || /^::1$/.test(host) || /^localhost$/.test(host)) return "DIRECT";
        return "SOCKS5 127.0.0.1:9050; SOCKS 127.0.0.1:9050";
    }
});
