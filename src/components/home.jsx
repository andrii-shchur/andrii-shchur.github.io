import React, { Component } from 'react';
import Header from "./shared/header";
import {createRequest} from "./shared/utils";

class Home extends Component {
    loadDrugs = () => {
        const request = createRequest('getAllDrugs', 'GET', '', false);
        request.onload = () => {
            let response;
            if (request.status !== 200) {
                alert(request.responseText);
            } else {
                response = JSON.parse(request.response);
                // eslint-disable-next-line react/no-direct-mutation-state
                this.setState({drugs: response});
            }
        };

        request.onerror = () => {
            alert('No connection.');
        };
    }

    state = {
        header: [
            {label: 'Profile', link: '/userpage'},
        ],
        drugs: [],
    };

    componentDidMount() {
        this.loadDrugs();
    }

    render() {
        if (!localStorage.getItem('api_key'))
        {
            alert("UNAUTHORIZED!!!");
            return ;
        }
        const {header} = this.state;
        let drugs = this.state.drugs;
        return (
            <React.Fragment>
                <Header header={header}></Header>
                <div className="content">
                    {drugs.map((element, i) => {
                        return(
                        <div key={i} className="drug-box">
                            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                            <img className="drug-img" src="/img/pill2.png" alt="Drug picture"></img>
                            <div className="drug-name">{element.name}</div>
                            <div className="drug-description">{element.description}.</div>
                            <div className="drug-price">${element.price}</div>
                            <div className="buy-demand">
                                <input className="button" type="submit" value="Buy"></input>
                                <input className="button" type="submit" value="Demand"></input>
                            </div>
                        </div>
                        )}
                    )}
                </div>
            </React.Fragment>
        )
    }
}

export default Home;
