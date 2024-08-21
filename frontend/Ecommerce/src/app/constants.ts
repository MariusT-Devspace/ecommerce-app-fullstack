export enum ThemeColor {
    PRIMARY = 'primary',
    ACCENT = 'accent',
    WARN = 'warn',
    ERROR = 'error'
}

// Routes
type Route = "products" | "users";

interface RouteInfo {
    slug: string;
    title: string;
}

export const ROUTES: Record<Route, RouteInfo> = {
    products: { slug: "products", title: "Products" },
    users: { slug: "users", title: "Users" }
}