import {
    Route as ReactDOMRoute,
    Redirect,
} from "react-router-dom"

import { useAuth } from '../contexts/Auth'

function RouteComponent({
    component: Component,
    isPrivate = false,
    ...rest
}) {
    const { user } = useAuth()

    console.log({ user: !!user, isPrivate })

    return (
        <ReactDOMRoute
            {...rest}
            render={({ location }) => {
                return isPrivate === !!user ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: isPrivate ? "/" : "/dashboard",
                            state: { from: location },
                        }}
                    />
                );
            }}
        />
    );
}

export default RouteComponent;