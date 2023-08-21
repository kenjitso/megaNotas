export function buildUrl(algoritmo: number, codigo: string) {
    switch (algoritmo) {
        case 1: return `https://atacadogames.com/lista-produtos/termo/${codigo}/1`;
        case 7: return `https://www.megaeletro.com.py/br/p/${codigo}/1`;
        case 5: return `https://www.madridcenter.com/produtos?q=${codigo}`;
        case 4: return `https://cellshop.com/catalogsearch/result/?q=${codigo}`;
        case 8: return `https://www.mobilezone.com.br/search/q?search=${codigo}`;
        case 3: return `https://www.bestshop.com.py/buscar/${codigo}`;
        case 6: return `https://stargamesparaguay.com/?s=${codigo}`;
        default: return '#';
    }
}
