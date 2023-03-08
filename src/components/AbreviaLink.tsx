export function abreviaLink(link: string, maxLength: number): string {
    if (link.length > maxLength) {
        const start = link.substring(0, maxLength / 2);
        const end = link.substring(link.length - maxLength / 2);
        return `${start}...${end}`;
    }
    return link;
}