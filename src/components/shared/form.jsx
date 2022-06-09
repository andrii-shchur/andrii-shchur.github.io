import React, { Component } from 'react';

class Form extends Component {
    render() {
        const {inputs, role, button, formId, onSubmit} = this.props.form;
        let r = "";
        if (role) {
            r = <div className="input-row">
                <label>Role: </label>
                <select id="role" name="atype">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>;
        }

        return (
            <React.Fragment>
                <form id={formId} onSubmit={onSubmit}>
                    {inputs.map((element, i) => {
                        return (
                            <div key={i} className="input-row">
                                <input className={element.className} type={element.type} placeholder={element.placeholder} name={element.name}></input>
                            </div>
                        )}
                    )}

                    {r}

                    <div className="input-row">
                        <input className="button" type={button.type} value={button.value}></input>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

export default Form;
