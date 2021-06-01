import React, { Component } from "react";
import { Snackbar } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Alert from "@material-ui/lab/Alert";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import "./ShirtCard.scss";

export default class ShirtCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openAlert: false,
        };
        this.handleNotSupport = this.handleNotSupport.bind(this);
    }
    handleNotSupport() {
        this.setState({ openAlert: true });
    }

    render() {
        const { size, shirt, type, handleDeleteFromFavorites } = this.props;
        const isInFavorite = handleDeleteFromFavorites !== undefined;
        const arrRating =[];
        shirt.comments.forEach(element => {
            arrRating.push(element.rating);
        });
        const sum=arrRating.reduce((partial_sum, a) => partial_sum + a,0);
        return (
            <Card className="ShirtCard">
                <div className="hover">
                    <div className="layout">
                        <Link className="icon" to="#">
                            {isInFavorite ? (
                                <DeleteForeverIcon
                                    fontSize="large"
                                    onClick={() =>
                                        handleDeleteFromFavorites(shirt._id)
                                    }
                                />
                            ) : (
                                <FavoriteIcon
                                    fontSize="large"
                                    onClick={this.handleNotSupport}
                                />
                            )}
                        </Link>

                        <Link className="icon" to="#">
                            <ShoppingBasketIcon
                                fontSize="large"
                                onClick={this.handleNotSupport}
                            />
                        </Link>
                        <Link className="icon" to="#">
                            <FindInPageIcon
                                fontSize="large"
                                onClick={this.handleNotSupport}
                            />
                        </Link>
                    </div>
                    <CardMedia
                        className="media"
                        image={shirt.images[0]}
                        title="Contemplative Reptile"
                    />
                </div>

                <CardContent
                    className={`content ${size === "small" ? "small" : ""}`}
                >
                    <div className="title">
                        <Link
                            target={type === "newTab" ? "_blank" : ""}
                            to={`/shop/detail/${shirt._id}`} 
                        >
                            {shirt.name}
                        </Link>
                    </div>
                    <div className="price">
                        <span>{shirt.price}.000 đ</span>
                    </div>
                    <div className="rating">
                        <Rating name="half-rating-read" value={sum/arrRating.length} size="small" precision={0.5} readOnly />
                        <span>({arrRating.length})</span>
                    </div>
                </CardContent>
                <Snackbar
                    open={this.state.openAlert}
                    autoHideDuration={6000}
                    onClose={() => this.setState({ openAlert: false })}
                >
                    <Alert
                        onClose={() => this.setState({ openAlert: false })}
                        severity="info"
                    >
                        Tính năng này chưa được hỗ trợ. Xin quý khách thông cảm.
                    </Alert>
                </Snackbar>
            </Card>
        );
    }
}