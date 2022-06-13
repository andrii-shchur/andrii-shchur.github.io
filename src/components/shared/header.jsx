import React, { Component } from 'react';

class Header extends Component {
    render() {
        const {header} = this.props;
        return (
            <React.Fragment>
                <header>
                    <nav className="navbar">
                        <ul>
                            <li className="logo"><a href={localStorage.getItem('api_key') ? '/home' : '/'}>Pharmacy</a></li>
                            {header.map((element, i) => {
                                return (<li key={i} className="nav-link"><a href={element.link}>{element.label}</a></li>)}
                            )}
                        </ul>
                    </nav>
                </header>
            </React.Fragment>
        )
    }
}

export default Header;
