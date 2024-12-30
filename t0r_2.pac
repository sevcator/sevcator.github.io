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
        if (/^(?:.*\.)?(soundcloud\.com|sndcdn\.com|soundcloud\.cloud|spotify\.com|openai\.com|chatgpt\.com|oaistatic\.com|oaiusercontent\.com|auth0\.com)$/.test(host)) {
            return "+proxy";
        }
        return "DIRECT";
    },
    "+proxy": function(url, host, scheme) {
        "use strict";
        if (/^127\.0\.0\.1$/.test(host) || /^::1$/.test(host) || /^localhost$/.test(host)) return "DIRECT";
        return "SOCKS5 127.0.0.1:9050; SOCKS 127.0.0.1:9050";
    }
});
