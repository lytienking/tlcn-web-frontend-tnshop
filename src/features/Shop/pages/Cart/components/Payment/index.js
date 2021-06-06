import React,{useState} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {Snackbar} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Button} from "reactstrap";
import userApi from "../../../../../../api/userApi";
import "./index.scss";

function Payment(props) {
    const history=useHistory();
    let {totalPrice: total,feeDelivery:fee} = props.cart;
    const [openAlert,setOpenAlert]=useState(false);
    const [content,setContent]=useState("");
    const [type,setType]=useState("");
    const [street,setStreet] = useState("");
    const [district,setDistrict] = useState("Quận 1");
    const [phone,setPhone]=useState(0);
    const handleOrder = () => {
        (async () =>{
            try {
                
                let params ={
                    city : "Tp Hồ Chí Minh",
                    street:street,
                    phone:phone,
                    district:district
                }
                if(params.street!==""&& params.phone!==0 && params.district!==""){
                    const response=await userApi.order(params);
                    if (response.success) {
                        setOpenAlert(true);
                        setContent(
                            "Đã đặt hàng thành công. Quý khách sẽ được chuyển sang trang thanh toán."
                        );
                        setType("success");
                        setTimeout(function () {
                            history.push("/user/checkout");
                        }, 2000);
                    } else {
                        setOpenAlert(true);
                        setContent(response.msg);
                        setType("warning");
                    }
                }else{
                    setOpenAlert(true);
                    setContent("Vui lòng nhập đầy đủ thông tin");
                    setType("warning");
                }
                
            } catch (error) {
                console.log(`failed remove cart api as ${error}`);
            }   
        })();
    }
    
    return (
        <div className="payment">
            <h5 className="mb-3">Thông tin đơn hàng</h5>
            <div className="cost">
                <p>Tạm tính</p>
                <div className="number">
                    {total}.000<u>đ</u>
                </div>
            </div>
            <div className="cost">
                <p>Phí giao hàng</p>
                <div className="number">
                    {fee}.000<u>đ</u>
                </div>
            </div>
            <div className="cost total">
                <p>Tổng cộng</p>
                <div className="number">
                     {total+fee}.000<u>đ</u>
                </div>
            </div>
            <h5 className="mb-3">Địa chỉ giao hàng</h5>
            <div className="container">
                <form>
                    <div className="row">
                        <div className="col-25">
                            <label for="fname">Điện thoại</label>
                        </div>
                        <div className="col-75">
                            <input type="number" onChange={(event)=>{setPhone(event.target.value)}}  id="fname" name="firstname" placeholder="Số điện thoại.." required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label for="lname">Tên đường</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="lname" onChange={(event)=>{setStreet(event.target.value)}} name="lastname" placeholder="Tên đường.." required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label for="subject">Thành phố</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="lname" name="lastname" placeholder="TP. Hồ Chí Minh" disabled />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label for="country">Quận</label>
                        </div>
                        <div className="col-75">
                            <select onChange={(event)=>{setDistrict(event.target.value)}} value={district} id="country" name="country">
                                <option value="Quận 1">Quận 1</option>
                                <option value="Quận 2">Quận 2</option>
                                <option value="Quận 3">Quận 3</option>
                                <option value="Quận 4">Quận 4</option>
                                <option value="Quận 5">Quận 5</option>
                                <option value="Quận 6">Quận 6</option>
                                <option value="Quận 7">Quận 7</option>
                                <option value="Quận 8">Quận 8</option>
                                <option value="Quận 9">Quận 9</option>
                                <option value="Quận 10">Quận 10</option>
                                <option value="Quận 11">Quận 11</option>
                                <option value="Quận 12">Quận 12</option>
                                <option value="Quận Bình Thạnh">Quận Bình Thạnh</option>
                                <option value="Quận Thủ Đức">Quận Thủ Đức</option>
                                <option value="Quận Gò Vấp">Quận Gò Vấp</option>
                                <option value="Quận Phú Nhuận">Quận Phú Nhuận</option>
                                <option value="Quận Tân Bình">Quận Tân Bình</option>
                                <option value="Quận Tân Phú">Quận Tân Phú</option>
                                <option value="Quận Bình Tân">Quận Bình Tân</option>
                                <option value="Huyện Nhà Bè">Huyện Nhà Bè</option>
                                <option value="Huyện Hóc Môn">Huyện Hóc Môn</option>
                                <option value="Huyện Bình Chánh">Huyện Bình Chánh</option>
                                <option value="Huyện Củ Chi">Huyện Củ Chi</option>
                                <option value="Huyện Cần Giờ">Huyện Cần Giờ</option>
                            </select>
                        </div>
                    </div>
                    
                </form>
            </div>
            <div className="button">
                <Button color="primary" block onClick={handleOrder}>
                    Đặt hàng
                </Button>
            </div>
            
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={() => setOpenAlert(false)}
            >
                <Alert onClose={() => setOpenAlert(false)} severity={type}>
                    {content}
                </Alert>
            </Snackbar>
        </div>
    );
}
const mapStateToProps = (state) => ({
    cart:state.cart,
});
export default connect(mapStateToProps,null)(Payment);