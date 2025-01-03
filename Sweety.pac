# sevcator.github.io
function FindProxyForURL(url, host) {
    const ipMapping = {
        "dns.google": ["8.8.8.8", "8.8.4.4"],
        "one.one.one.one": ["1.1.1.1", "1.0.0.1"],
        "dns.quad9.net": ["149.112.112.112", "9.9.9.9"],
        "comss.dns.controld.com": ["76.76.2.22"]
    };
    for (const domain in ipMapping) {
        if (host === domain) {
            return "SOCKS5 127.0.0.1:9050";
        }
        for (const ip of ipMapping[domain]) {
            if (dnsResolve(host) === ip) {
                return "SOCKS5 127.0.0.1:9050";
            }
        }
    }
    const proxyDomains = [
        /^promoted\.soundcloud\.com$/,
        /^dwt\.soundcloud\.com$/,
        /^api.*\.soundcloud\.com$/,
        /^soundcloud\.com$/,
        /^chatgpt\.com$/,
        /^openai\.com$/,
        /^oaistatic\.com$/,
        /^oaiusercontent\.com$/,
        /^auth0\.com$/,
        /^accounts\.spotify\.com$/,
        /^api\.spotify\.com$/,
        /^open\.spotify\.com$/,
        /^www\.spotify\.com$/,
        /^spotify\.com$/,
        /^spotifycdn\.com$/,
        /^scdn\.co$/
    ];
    for (let i = 0; i < proxyDomains.length; i++) {
        if (proxyDomains[i].test(host)) {
            return "SOCKS5 127.0.0.1:9050";
        }
    }
    return "DIRECT";
}
