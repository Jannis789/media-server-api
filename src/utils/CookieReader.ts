class CookieReader {
    private cookies: Record<string, string>;

    constructor(cookieHeader: string | null) {
        this.cookies = cookieHeader
            ? Object.fromEntries(
                  cookieHeader.split(';').map(cookie => {
                      const [key, value] = cookie.split('=').map(part => part.trim());
                      return [key, value ? decodeURIComponent(value) : ''];
                  })
              )
            : {};
    }

    get(name: string): string | undefined {
        return this.cookies[name];
    }
}

export { CookieReader };