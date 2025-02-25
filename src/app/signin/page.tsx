import exp from "constants";
import React from "react";

const SignInPage = () => {
    return (
        <div>
            <h1>Sign In</h1>
            <form>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignInPage;