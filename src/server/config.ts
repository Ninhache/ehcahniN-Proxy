export interface RedirectRoute {
    route: string;
    target: string;
}

export const subroutes: RedirectRoute[] = [
    // {
    //     route: "api",
    //     redirectUrl: "http://localhost:8080/"
    // },
]

export const routes: RedirectRoute[] = [
    {
        route: "users",
        target: "https://jsonplaceholder.typicode.com/users"
    },
    {
        route: "",
        target: "http://localhost:3000/"
    },
    
]