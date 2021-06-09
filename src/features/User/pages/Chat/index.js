import React, { useEffect, useState } from 'react';
import { Col, Row,Button } from "reactstrap";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SendIcon from '@material-ui/icons/Send';
import './index.scss'
//import UserAPI from '../API/UserAPI';
//import ListUser from './Component/ListUser';
import queryString, { stringify } from 'query-string'
//import MessengerAPI from '../API/MessengerAPI';
import parse from 'html-react-parser';
import { IconButton } from '@material-ui/core';

 import io from "socket.io-client";
 const socket = io("http://localhost:3001");
function Chat(props){
    const [send, setSend] = useState('')

    useEffect(()=>{
        socket.on('hello', (data)=>{
            console.log(data.message)
        })
    }, [])

    function formatIcon(send) {
        
        //Đây là list icon dùng để duyệt và đổ ra dữ liệu
        const icon = [
            { id: 1, image: `<img src='https://www.flaticon.com/svg/static/icons/svg/742/742760.svg' />`, category: ':('},
            { id: 2, image: `<img src='https://www.flaticon.com/svg/static/icons/svg/742/742750.svg' />`, category: '*_*'},
            { id: 3, image: `<img src='https://www.flaticon.com/svg/static/icons/svg/742/742920.svg' />`, category: ':)'},
            { id: 4, image: `<img src='https://www.flaticon.com/svg/static/icons/svg/742/742822.svg' />`, category: 'T_T'},
            { id: 5, image: `<img src='https://www.flaticon.com/svg/static/icons/svg/742/742787.svg' />`, category: '-,-'},
            { id: 6, image: `<img src='https://www.flaticon.com/svg/static/icons/svg/742/742745.svg' />`, category: ':*'},
        ]

        //Duyệt vòng foreach của list icon để kiểm tra chuỗi truyền vào có tồn tại category không
        //Nếu trong cái chuỗi string đó có tồn tại category của icon thì nó sẽ replace thành thẻ <image>
        icon.forEach(element => {
            if (send.indexOf(element.category) > -1){
                console.log("True")

                //Replace
                send = send.replace(element.category, element.image)

            }
        });

        return send
    }
    const [emotion, setEmotion] = useState(false)
    const onClickEmotion = () => {
        
        setEmotion(!emotion)

    }
    const onClickIcon = (value) => {
        
        setSend(send + "" + value + " ")
 
    }
    return(
        <div className="app">
            <Row className="app-one">
                <Col sm={4} className="side">
                    <div className="side-one">

                    </div>
                </Col>
                <Col sm={8} className="conversation">
                    <Row className="message" id="conversation">
                        <Row className="message-previous">
                            <Col sm={12} className="previous">
                                <div className="message-main-sender">
                                    <div className="sender">
                                        <span className="message-time pull-right">Bạn</span>
                                        <div className="message-text">
                                            Anything
                                        </div>
                                    </div>
                                </div>
                                <div className="message-main-receiver">
                                    <div className="receiver">
                                        <span className="message-time pull-right">Nó</span>
                                        <div className="message-text">
                                            Baby
                                        </div>
                                    </div>
                                </div>
                                <div className="wrapper_loading">
                                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div>
                                    </div>
                                </div>
                                { emotion && (<div className="show_icon">
                                    <div className="list_icon">
                                        <div className="icon" onClick={() => onClickIcon(":(")}>
                                            <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/742/742760.svg" alt=""/>
                                        </div>
                                        <div className="icon" onClick={() => onClickIcon("*_*")}>
                                            <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/742/742750.svg" alt=""/>
                                        </div>
                                        <div className="icon" onClick={() => onClickIcon(":)")}>
                                            <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/742/742920.svg" alt=""/>
                                        </div>
                                        <div className="icon" onClick={() => onClickIcon("T_T")}>
                                            <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/742/742822.svg" alt=""/>
                                        </div>
                                        <div className="icon" onClick={() => onClickIcon("-,-")}>
                                            <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/742/742787.svg" alt=""/>
                                        </div>
                                        <div className="icon" onClick={() => onClickIcon(":*")}>
                                            <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/742/742745.svg" alt=""/>
                                        </div>
                                    </div>
                                </div>)
                                }
                                <Row className="reply">
                                    <Col sm={1} xs={1} className="reply-emojis">
                                        <IconButton style={{padding:"0",marginLeft:"15px"}} onClick={onClickEmotion}>
                                            <EmojiEmotionsIcon fontSize="large" className="icon-emojis"/>
                                        </IconButton>
                                    </Col>
                                    <Col sm={10} xs={10} className="reply-main">
                                        <input className="form-control" type="text" />
                                    </Col>
                                    <Col sm={1} xs={1} className="reply-send">
                                        <IconButton style={{padding:"0",marginLeft:"15px"}} >
                                            <SendIcon fontSize="large"/>
                                        </IconButton>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Row>
                </Col>
            </Row>
            
        </div>
    );
}

export default Chat;