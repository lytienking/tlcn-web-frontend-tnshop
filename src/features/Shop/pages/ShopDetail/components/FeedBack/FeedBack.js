import React from "react";
import {Row,Col} from "reactstrap";
import AddComment from "../../../ShopStore/components/ReviewStore/components/AddComment/index";
import Comment from "../../../ShopStore/components/ReviewStore/components/Comment/index";
import userApi from "../../../../../../api/userApi";
import { setCommentsProduct } from "../../../../../../actions/user";
import { connect, useDispatch } from "react-redux";
import {isLogin} from "../../../../../../untils/auth";
import { useHistory } from "react-router-dom";
import "./FeedBack.scss";
function FeedBack(props) {
    const dispatch = useDispatch();
    const history=useHistory();
    const handleComment = (e, content) => {
        let body = {
            content,
            author: "demo",
            rating: 4,
            productID: props.shirtId,
        };
        if(!isLogin()){
            history.push("/user/login");
        }
        (async () => {
            try {
                const response = await userApi.commentProduct(body);
                console.log("res2",response);    
                if (response.success) {
                    let action = await setCommentsProduct(response.comments.comments);
                    dispatch(action);
                }
            } catch (error) {
                console.log(`failed post comments as ${error}`);
            }
        })();
    };
    return (
        <div className="review-store">
            <h5 className="mb-4">Nhận xét từ khách hàng:</h5>
            <Row>
                <Col xs={12}>
                    <AddComment handleComment={handleComment} />
                </Col>
            </Row>
            {props.commentsproduct.map((comment) => (
                <Row>
                    <Col xs={12}>
                        <Comment comment={comment} />
                    </Col>
                </Row>
            ))}
        </div>
    );
}

const mapStateToProps = (state) => ({
    commentsProduct: state.user.commentsProduct,
});

export default connect(mapStateToProps, null)(FeedBack);