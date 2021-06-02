import React from "react";
import { Col, Row } from "reactstrap";
import Pagination from "@material-ui/lab/Pagination";

import ShirtCard from "../../../../../../components/ShirtCard/ShirtCard";
import "./index.scss";

export default function ProductStore(props) {
    console.log("ádg",props)
    return (
        <div className="product-store">
            <Row>
                {props.shirtsStore.docs.map((shirt) => (
                    <Col xs={3}>
                        <ShirtCard shirt={shirt} size="small" />
                    </Col>
                ))}
            </Row>
            <div className="pagination">
                <Pagination
                    count={props.shirtsStore.pages}
                    color="secondary"
                    onChange={props.onChangePagination}
                />
            </div>
        </div>
    );
}