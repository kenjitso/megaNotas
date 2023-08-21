export function abreviaLink(link: string | undefined, maxLength: number): string {
    if (!link) {
        return '';
    }
    if (link.length > maxLength) {
        const start = link.substring(0, maxLength / 2);
        const end = link.substring(link.length - maxLength / 2);
        return `${start}...${end}`;
    }
    return link;
}
