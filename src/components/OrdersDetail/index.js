import { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import userApi from "../../api/userApi";
import { getOrderDetail } from "../../actions/user";
import InforOrder from "./components/index";
import _ from "lodash";

class OrdersDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idOrder: "",
    };
  }
  
  componentDidMount() {
    (async () => {
      let idOrder = this.props.match.params.id_orders;
      console.log("idOrder", idOrder);
      this.setState({ idOrder });
      const respone = await userApi.orderDetail(idOrder);
      const action = await getOrderDetail(respone);
      this.props.dispatch(action);
      console.log("resp", respone);
    })();
  }

  render() {
    const propsOrder = this.props.orderDetail;
    return (
      <div>
        {_.isEmpty(propsOrder) ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <InforOrder orderDetails={propsOrder} />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  orderDetail: state.user.orderDetail,
});

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(OrdersDetail);
