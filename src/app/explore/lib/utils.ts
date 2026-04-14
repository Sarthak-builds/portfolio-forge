export function assignCardColors(cards: any) {
    // If the data is wrapped (e.g. from a standardized API response), extract it
    const list = Array.isArray(cards) 
        ? cards 
        : (cards && Array.isArray(cards.portfolios) 
            ? cards.portfolios 
            : (cards && Array.isArray(cards.data) ? cards.data : []));
    
    const colors = [
        "bg-card",
        "bg-card",
        "bg-card",
        "bg-card",
        "bg-card",
    ];

    return list.map((card: any, index: number) => ({
        ...card,
        color: colors[index % colors.length],
    }));
}

export function getHostname(url: string) {
    try {
        const hostname = new URL(url).hostname;
        return hostname.replace("www.", "");
    } catch {
        return url;
    }
}
