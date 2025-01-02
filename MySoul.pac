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
        var proxyList = [
            /^promoted\.soundcloud\.com$/,
            /^dwt\.soundcloud\.com$/,
            /^api.*\.soundcloud\.com$/,
            /chatgpt\.com$/,
            /openai\.com$/,
            /oaistatic\.com$/,
            /oaiusercontent\.com$/,
            /auth0\.com$/,
            /^www\.tiktok\.com$/,
            /^www\.intel\.com$/,
            /^accounts\.spotify\.com$/,
            /^api\.spotify\.com$/,
            /^open\.spotify\.com$/,
            /^www\.spotify\.com$/,
            /^spotify\.com$/,
            /spotifycdn\.com$/,
            /scdn\.co$/,
            /(?:^|\.)gstatic\.com$/
        ];

        for (var i = 0; i < proxyList.length; i++) {
            if (proxyList[i].test(host)) return "+proxy";
        }
        return "DIRECT";
    },
    "+proxy": function(url, host, scheme) {
        "use strict";
        function isProxyAccessible(proxy) {
            try {
                var xhr = new XMLHttpRequest();
                xhr.open("HEAD", "http://example.com", false, proxy);
                xhr.setRequestHeader("Proxy-Connection", "keep-alive");
                xhr.send();
                return xhr.status >= 200 && xhr.status < 300;
            } catch (e) {
                return false;
            }
        }
        var proxy = "SOCKS5 127.0.0.1:9050; SOCKS 127.0.0.1:9050";
        if (isProxyAccessible(proxy)) {
            return proxy;
        } else {
            return "DIRECT"; // Если прокси недоступен, возвращается DIRECT
        }
    }
});
