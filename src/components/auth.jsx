import React, { Component } from 'react';
import Header from './shared/header';
import Form from "./shared/form";
import {createRequest} from "./shared/utils";
import { Navigate } from "react-router-dom";

class Auth extends Component {
    registerListener = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());

        if (formValues.password !== formValues.cpassword) {
            alert('passwords should match');
            return;
        }
        delete formValues.cpassword;

        const auth = btoa(`${formValues.username}:${formValues.password}`);

        const request = createRequest('createAccount', 'POST', JSON.stringify(formValues), false);

        request.onload = () => {
            let response;
            if (request.status !== 200) {
                alert(request.responseText);
            } else {
                response = JSON.parse(request.response);
                localStorage.setItem('api_key', auth);
                localStorage.setItem('user_id', response.user_id);
                localStorage.setItem('username', response.username);
                if (response.atype === 'admin') {
                    window.location = 'adminpage';
                } else {
                    window.location = 'userpage';
                }
            }
        };

        request.onerror = () => {
            alert('No connection.');
        };
    };

    loginListener = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());

        const auth = btoa(`${formValues.username}:${formValues.password}`);

        const request = createRequest('loginAccount', 'POST', JSON.stringify(formValues), false);
        request.onload = () => {
            let response;
            if (request.status !== 200) {
                alert(request.responseText);
            } else {
                response = JSON.parse(request.response);
                localStorage.setItem('api_key', auth);
                localStorage.setItem('user_id', response.user_id);
                localStorage.setItem('username', response.username);
                if (response.atype === 'admin') {
                    this.setState({redirect: 'adminpage'});
                } else {
                    this.setState({redirect: 'userpage'});
                }
            }
        };

        request.onerror = () => {
            alert('No connection.');
        };
    };

    state = {
        header: [
            {label: 'Sign in', link: '#login-hidden'},
            {label: 'Sign up', link: '#register-hidden'},
        ],
        loginForm: {
            formId: 'login-form',
            inputs: [
                {className: 'field', type: 'text', placeholder: 'Username', name: 'username'},
                {className: 'field', type: 'password', placeholder: 'Password', name: 'password'},
            ],
            role: false,
            button: {type: 'submit', value: 'Login'},
            onSubmit: this.loginListener,
        },
        registerForm: {
            formId: 'register-form',
            inputs: [
                {className: 'field', type: 'text', placeholder: 'Phone', name: 'phone'},
                {className: 'field', type: 'text', placeholder: 'Username', name: 'username'},
                {className: 'field', type: 'text', placeholder: 'First name', name: 'fname'},
                {className: 'field', type: 'text', placeholder: 'Last name', name: 'lname'},
                {className: 'field', type: 'password', placeholder: 'Password', name: 'password'},
                {className: 'field', type: 'password', placeholder: 'Confirm password', name: 'cpassword'},
            ],
            role: true,
            button: {type: 'submit', value: 'Register'},
            onSubmit: this.registerListener,
        },
        redirect: null,
    };

    render() {
        const {header, loginForm, registerForm, redirect} = this.state;
        return (
            <React.Fragment>
                <Header header={header}></Header>
                <div id="login-hidden" className="dialog">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="close" href="#">&times;</a>
                    <Form form={loginForm}></Form>
                </div>
                <div id="register-hidden" className="dialog">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="close" href="#">&times;</a>
                    <Form form={registerForm}></Form>
                </div>
                <div className="content">
                    <img className="c-section image" src="/img/pills.png" alt="Pills"></img>
                        <div className="c-section description">
                            <span className="desc-1">We’re one of the most experienced providers of clinical homecare, and we’ve been supporting patients in this way since 1975.</span>
                            <br></br><br></br><br></br><br></br>
                                <span className="desc-2">We provide care to more than 100,000 patients in the comfort of their home, at work, or in the community – ranging from straightforward delivery of medication to specialist nursing for complex conditions. We’re passionate about what we do and the difference we make to our patients’ lives. It’s this dedication that ensures we constantly deliver outstanding levels of care to our patients.</span>
                        </div>
                </div>
                { redirect ? <Navigate to={ redirect } /> : '' }
            </React.Fragment>
        )
    }
}

export default Auth;
