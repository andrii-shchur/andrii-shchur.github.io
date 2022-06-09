import { Component } from 'react';
import {logout} from "./shared/utils";
import { Navigate } from 'react-router-dom';

class Logout extends Component {
    render() {
        logout();
        return (
            <Navigate to='/' />
        );
    }
}

export default Logout;
