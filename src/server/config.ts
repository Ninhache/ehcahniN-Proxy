export interface Subroutes {
    route: string;
    redirectUrl: string;
}

export const config: Subroutes[] = [
    {
        route: "api",
        redirectUrl: "http://localhost:3000/"
    },
    {
        route: "beta",
        redirectUrl: "http://localhost:3001/"
    }
]