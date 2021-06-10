import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from "reactstrap";
import storeImg from "../../../../../assets/images/store_img.png";
import "./ListUser.scss";
ListUser.propTypes = {
    listUser: PropTypes.array,
    GetUserID: PropTypes.func
};

ListUser.defaultProps = {
    listUser: [],
    GetUserID: null
}
function ListUser(props) {

    const { listUser, GetUserID } = props

    const onClickUser = (user_id) => {
        
        GetUserID(user_id)

    }

    return (
        <div>
            {
                listUser && listUser.map(value => (
                    <Row className="sideBar-body" key={value._id} onClick={() => onClickUser(value._id)}>
                        <Col sm={3} xs={3} className="sideBar-avatar">
                            <div className="avatar-icon">
                                <img src={value.avatar?value.avatar:storeImg}/>
                            </div>
                        </Col>
                        <Col sm={9} xs={9} className="sideBar-main">
                            <Row className="sideBar-row">
                                <Col sm={8} xs={8} className="sideBar-name">
                                    <span className="name-meta">{value.name}</span>
                                </Col>
                                <Col sm={4} xs={4} className="pull-right sideBar-time">
                                    <span className="time-meta pull-right">Online</span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                ))
            }
        </div>
    );
}

export default ListUser;