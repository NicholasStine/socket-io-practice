import React, { useState, useEffect } from 'react';
import ioClient from "socket.io-client";
import './chatBox.css';

const ENDPOINT = "http://localhost:8080"
const socket = ioClient(ENDPOINT);

function ChatBox(props){
    const [msgList, setMsgList] = useState([]);
    const [msg, setMsg] = useState("");

    function onMsgChange(e){
        e.preventDefault();
        console.log(`onMsgChange: ${e.target.value}`);
        setMsg(e.target.value);
    }

    function onSendClick(e){
        e.preventDefault();
        console.log("onSendClick");
        setMsgList([...msgList, msg]);
        socket.emit('send-message', msg);
    }

    socket.on('recieve-message', res => {
        setMsgList([...msgList, res]);
    });

    useEffect(() => {
        socket.on('first', res => {
            console.log(res);
        });
    }, []);

    return(
        <div className="chat-box">
            <h1 className="chat-title">{props.title}</h1>
            <div className="msg-display">
                <ul className="msg-list">
                    {msgList.map((tempMsg, i) => {
                        return <li className="msg" key={i}>{tempMsg}</li>
                })}
                </ul>
            </div>
            
            <form className="msg-form" >
                <input onChange={onMsgChange}/>
                <button className="msg-send-button" onClick={onSendClick}>Send</button>
            </form>
            
        </div>
    )
}

export default ChatBox;