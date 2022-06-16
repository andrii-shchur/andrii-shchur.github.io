import React, { Component } from 'react';
import Header from "./shared/header";
import Form from "./shared/form";
import {createRequest} from "./shared/utils";

class Admin extends Component {
    addAdminListener = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());

        const request = createRequest('addDrug', 'POST', JSON.stringify(formValues), true);

        request.onload = () => {
            if (request.status !== 200) {
                alert(request.responseText);
            } else {
                const response = JSON.parse(request.response);
                alert(`Success!! id: ${response.id}`);
            }
        };

        request.onerror = () => {
            alert('No connection.');
        };
    }

    updateAdminListener = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());

        const request = createRequest('updateDrug', 'PATCH', JSON.stringify(formValues), true);

        request.onload = () => {
            if (request.status !== 200) {
                alert(request.responseText);
            } else {
                alert('Success!!');
            }
        };

        request.onerror = () => {
            alert('No connection.');
        };
    }

    deleteAdminListener = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());

        const request = createRequest('deleteDrug', 'DELETE', JSON.stringify(formValues), true);

        request.onload = () => {
            if (request.status !== 200) {
                alert(request.responseText);
            } else {
                alert('Success!!');
            }
        };

        request.onerror = () => {
            alert('No connection.');
        };
    }


    state = {
        header: [
            {label: 'Logout', link: '/logout'},
            {label: 'Chat', link: '/chat'},
        ],
        addForm: {
            formId: 'add-admin-form',
            inputs: [
                {className: 'field', type: 'text', placeholder: 'Name', name: 'name'},
                {className: 'field', type: 'text', placeholder: 'Description', name: 'description'},
                {className: 'field', type: 'text', placeholder: 'Price', name: 'price'},
                {className: 'field', type: 'text', placeholder: 'Available', name: 'available'},
            ],
            role: false,
            button: {type: 'submit', value: 'Add'},
            onSubmit: this.addAdminListener,
        },
        updateForm: {
            formId: 'update-admin-form',
            inputs: [
                {className: 'field', type: 'text', placeholder: 'Drug id', name: 'drug_id'},
                {className: 'field', type: 'text', placeholder: 'Name', name: 'name'},
                {className: 'field', type: 'text', placeholder: 'Description', name: 'description'},
                {className: 'field', type: 'text', placeholder: 'Price', name: 'price'},
                {className: 'field', type: 'text', placeholder: 'Available', name: 'available'},
            ],
            role: false,
            button: {type: 'submit', value: 'Update'},
            onSubmit: this.updateAdminListener,
        },
        deleteForm: {
            formId: 'delete-admin-form',
            inputs: [
                {className: 'field', type: 'text', placeholder: 'Drug id', name: 'drug_id'},
            ],
            role: false,
            button: {type: 'submit', value: 'Delete'},
            onSubmit: this.deleteAdminListener,
        },
    };

    render() {
        const {header, addForm, updateForm, deleteForm} = this.state;
        return(
            <React.Fragment>
                <Header header={header}></Header>
                <div className="content admin-menu">
                    <div className="input-row">
                        <a href="#add-hidden" className="button">Add Drug</a>
                    </div>
                    <div className="input-row">
                        <a href="#update-hidden" className="button">Update Drug</a>
                    </div>
                    <div className="input-row">
                        <a href="#delete-hidden" className="button delete">Delete Drug</a>
                    </div>
                </div>
                <div id="add-hidden" className="dialog">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="close" href="#">&times;</a>
                    <Form form={addForm}></Form>
                </div>
                <div id="update-hidden" className="dialog">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="close" href="#">&times;</a>
                    <Form form={updateForm}></Form>
                </div>
                <div id="delete-hidden" className="dialog">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="close" href="#">&times;</a>
                    <Form form={deleteForm}></Form>
                </div>
            </React.Fragment>
        )
    }
}

export default Admin;
