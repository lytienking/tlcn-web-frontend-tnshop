import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import payment1 from "../../../../assets/images/payment1.png";
import momo from "../../../../assets/images/paymentmomo.png";
import { Button} from "reactstrap";
import "./index.scss";
import { Checkbox } from "@material-ui/core";
import MomoApi from "../../../../api/momoApi";
class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateCheckA:true,
            stateCheckB:false,
        };
        this.handleChangeA = this.handleChangeA.bind(this);
        this.handleChangeB = this.handleChangeB.bind(this);
        this.handleCheckOut=this.handleCheckOut.bind(this);
    }
    
    handleChangeA() {
        this.setState({
            stateCheckB:false,
            stateCheckA:true,
        });
    }
    handleChangeB() {
        this.setState({
            stateCheckA:false,
            stateCheckB:true,
        });
    }
    handleCheckOut(strListID,total){
        (async () => {
            try {
                let body={
                    totalPrice:total,
                    listOrderId:strListID
                }
                const respone= await MomoApi.CheckOut(body);
                console.log("réajsd",respone);
            } catch (error) {
                console.log(`failed update cart as ${error}`);
            }
        })();
        console.log("here");
    }

    render() {
        let renderContent;
        let{listIdOrder:strIdOrder,totalPriceOrder: total}=this.props;
        console.log("str",strIdOrder);
        console.log("str2",total);
        if(this.state.stateCheckA){
            renderContent=(
                <Card>
                    <CardContent>
                        <div className="button">
                            <Button color="primary">
                                Xác nhận đơn hàng
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            );
        }else{
            renderContent=(
                <Card>
                    <CardContent>
                        <div className="button2">
                            <Button color="primary" onClick={this.handleCheckOut(strIdOrder,total)}>
                                Thanh toán ngay
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            );
        }
        return (
            <div className="CheckOut">
                <Container>
                    <Row>
                        <Col xs={8}>
                            <h3>Chọn phương thức thanh toán</h3>
                            <div className="CheckBoxMain">
                                <div className="leftCheckBox">
                                    <Card>
                                        <CardContent>
                                            <FormControlLabel
                                                control={<Checkbox checked={this.state.stateCheckA} onChange={this.handleChangeA} style={{color:"#ff5e00"}} name="checkedA" />}
                                                label="Khi nhận hàng"
                                            /><br></br>
                                            <img src={payment1} width={100} height={100} alt="logo"/>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="rightCheckBox">
                                    <Card >
                                        <CardContent>
                                            <FormControlLabel
                                                control={<Checkbox checked={this.state.stateCheckB} onChange={this.handleChangeB} style={{color:"#ff5e00"}} name="checkedB" />}
                                                label="Ví MoMo"
                                            /><br></br>
                                            <img src={momo} width={100} height={100} alt="logo"/>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                            <div className="GenerateContent">
                                    {renderContent}
                            </div>
                        </Col>
                        <Col xs={4}>
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    listIdOrder:state.user.listIdOrder,
    totalPriceOrder:state.user.totalPriceOrder
});
export default connect(mapStateToProps, null)(CheckOut);
