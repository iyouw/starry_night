export interface NavItem {
    title: string,
    path: string,
}

export interface NavGroup {
    title: string,
    items?: Array<NavItem>
}

export interface SiteLinkItem {
    logo: string,
    url: string
}

export interface SiteConfig {
    publicPath?: string,
    outDir: string,
    title: string,
    logo: string,
    description?: string,
    siteLinks?: Array<SiteLinkItem>,
    nav: Array<NavGroup>
}