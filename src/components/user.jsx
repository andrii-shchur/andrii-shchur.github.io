import React, { Component } from 'react';
import Header from "./shared/header";
import Form from "./shared/form";
import {createRequest} from "./shared/utils";
import {Navigate} from "react-router-dom";


class User extends Component {
    updateListener = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());

        formValues.user_id = localStorage.getItem('user_id');
        const request = createRequest('editAccount', 'PATCH', JSON.stringify(formValues), true);

        request.onload = () => {
            if (request.status !== 200) {
                alert(request.responseText);
            } else {
                const auth = btoa(`${formValues.username}:${formValues.password}`);
                localStorage.setItem('api_key', auth);
                alert("Successs!!");
            }
        };

        request.onerror = () => {
            alert('No connection.');
        };
    }

    deleteListener = (event) => {
        event.preventDefault();

        const userId = localStorage.getItem('user_id');
        const params = {
            user_id: userId,
        };
        const request = createRequest('deleteAccount', 'DELETE', JSON.stringify(params), true);

        request.onload = () => {
            if (request.status !== 200) {
                alert(request.responseText);
            } else {
                this.setState({redirect: '/logout'})
            }
        };

        request.onerror = () => {
            alert('No internet connection.');
        };
    }

    state = {
        header: [
            {label: 'Logout', link: '/logout'},
        ],
        updateForm : {
            formId: 'register-form',
            inputs: [
                {className: 'field', type: 'text', placeholder: 'Phone', name: 'phone'},
                {className: 'field', type: 'text', placeholder: 'Username', name: 'username'},
                {className: 'field', type: 'text', placeholder: 'First name', name: 'fname'},
                {className: 'field', type: 'text', placeholder: 'Last name', name: 'lname'},
                {className: 'field', type: 'password', placeholder: 'Password', name: 'password'},
            ],
            role: false,
            button: {type: 'submit', value: 'Update'},
            onSubmit: this.updateListener,
            redirect: null,
        }
    };

    render() {
        if (!localStorage.getItem('api_key'))
        {
            alert("UNAUTHORIZED!!!");
            return ;
        }
        const {header, updateForm, redirect} = this.state;
        return (
            <React.Fragment>
                <Header header={header}></Header>
                <div className="update-user">
                    <div className="greeting">
                        Welcome!
                    </div>
                    <Form form={updateForm}></Form>
                    <div className="input-row">
                        <input id="delete-user" className="button delete" type="submit" value="DELETE USER" onClick={this.deleteListener}></input>
                    </div>
                    { redirect ? <Navigate to={ redirect } /> : '' }
                </div>
            </React.Fragment>
        )
    }
}

export default User;
