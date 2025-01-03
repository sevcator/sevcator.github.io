function FindProxyForURL(url, host) {
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
            // Если хост из списка, используем прокси
            return "SOCKS5 127.0.0.1:9050";
        }
    }
    return "DIRECT";
}
