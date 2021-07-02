import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import ShirtCard from "../../../../../../components/ShirtCard/ShirtCard";
import "./SimilarProduct.scss";

export default class SimilarProducts extends Component {
  render() {
    const shirts = this.props;
    console.log("shirts", shirts);
    return (
      <div className="similar-products">
        <h3>Sản phẩm tương tự</h3>
        <Row>
          {shirts.shirts.map((item) => (
            <Col xs={3} key={item._id}>
              <ShirtCard type="newTab" shirt={item} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
