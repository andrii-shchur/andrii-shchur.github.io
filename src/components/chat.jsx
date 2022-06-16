import React, { Component } from 'react';
import Header from "./shared/header";
import {createRequest} from "./shared/utils";
import io from "socket.io-client";



class Chat extends Component {

    componentDidMount = () => {
        // socket.emit('auth', localStorage.getItem('api_key'));
        this.socket = io.connect('ws://127.0.0.1:5000');

        this.socket.on ('message', (msg) => {
            let temp = this.state.messages;
            temp.push(msg)
            this.setState({
                messages: temp,
            });
        })
    }

    sendMessage = (msg) => {
        if (msg !== "") {
            this.socket.send(msg);
        } else {
            alert("Message cannot be empty!");
        }
    }


    state = {
        messages : [],
        message: "",
    };


    render() {
        if (!localStorage.getItem('api_key'))
        {
            alert("UNAUTHORIZED!!!");
            return ;
        }
        const header = [
            {label: 'Profile', link: '/userpage'},
        ];
        return (
            <React.Fragment>
                <Header header={header}></Header>
                <div className="content">
                    <div className="drug-box">
                        <div className="chat-title">Support Chat 24/7</div>
                        <div className="chat-body">
                            { this.state.messages.map((message, i) => {
                                return (
                                    <div key={i} className="message">{message}</div>
                                )
                            })}
                        </div>
                        <textarea id="chat-textarea" placeholder="Your message" value={ this.state.message } onInput={(e) => this.setState({message: e.target.value})} />
                        <input onClick={() => {this.sendMessage(this.state.message)}} className="button send-message" type="submit" value="Send"></input>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Chat;
