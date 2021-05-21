import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import { connect } from "react-redux";
import AvatarStore from "./components/AvatarStore";
import InfoStore from "./components/InfoStore";
import ReviewStore from "./components/ReviewStore";
import ProductStore from "./components/ProductStore";
import _ from "lodash";
import shirtsApi from "../../../../api/shirtsApi";
import userApi from "../../../../api/userApi";
import {setComments} from "../../../../actions/user";
import {getShirtsStore} from "../../../../actions/user";
import "./index.scss";
//import shirts from "../../../../reducers/shirts";

class ShopStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seller: {},
            productBestSold:{},
            idStore: "",
        };
        this.onChangePagination = this.onChangePagination.bind(this);
    }
    componentDidMount() {
        (async () => {
            try {
                let idStore = this.props.match.params.id_store;
                this.setState({ idStore });
                let params = {
                    page: 1,
                    perPage: 4,
                    sellerId: idStore,
                };

                const response = await shirtsApi.get(params);
                console.log("respone",response);
                const resGetUser = await userApi.getById({ ID: idStore });
                this.setState({
                    seller: { ...resGetUser },
                });
                const resGetProductBestSold =await userApi.getProductBestSold(idStore);
                console.log("bestsell",resGetProductBestSold);
                let action = await getShirtsStore(response);

                this.props.dispatch(action);
                //console.log("action",this.props.dispatch(action))
                this.props.dispatch(setComments(resGetUser.comments));
            } catch (error) {
                console.log(`failed post register as ${error}`);
            }
        })();
    }
    onChangePagination(e, page) {
        (async () => {
            try {
                let idStore = this.props.match.params.id_store;

                let params = {
                    page: page,
                    perPage: 4,
                    sellerId: idStore,
                };
                const response = await shirtsApi.get(params);

                let action = await getShirtsStore(response);
                this.props.dispatch(action);

                // console.log(resDispatch);
            } catch (error) {
                console.log(`failed post register as ${error}`);
            }
        })();
    }
    render() {
        let { shirtsStore } = this.props;
        let {seller} =this.state;
        //console.log("shirtstore",shirtsStore);
        return (
            <div className="shop-store">
                <Container className="shop-store">
                    <Row>
                        <Col xs={3}>
                            {_.isEmpty(seller) ? (
                                <h1>Không có</h1>
                                ) : (
                                <AvatarStore seller={seller}/>
                            )}
                            
                        </Col>
                        <Col xs={9}>
                            <Row>
                                <Col>
                                    <InfoStore />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                {_.isEmpty(shirtsStore) ? (
                                        <h1>k co</h1>
                                    ) : (
                                        <div>
                                            <ProductStore
                                                onChangePagination={
                                                    this.onChangePagination
                                                }
                                                shirtsStore={shirtsStore}
                                            />
                                        </div>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <ReviewStore idStore={this.state.idStore} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    shirtsStore: state.shirts.shirtsStore,
});

export default connect(mapStateToProps, null)(ShopStore);