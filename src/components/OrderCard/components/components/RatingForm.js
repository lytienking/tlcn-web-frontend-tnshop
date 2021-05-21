import React, { Component } from "react";
import { Formik, Form, FastField } from "formik";
import RatingProduct from '../../../RatingProduct/RatingProduct';
import * as Yup from "yup";
import { Grid } from "@material-ui/core";
import {Snackbar,Button} from "@material-ui/core";
import {connect} from "react-redux";
import Alert from "@material-ui/lab/Alert";
import InputField from "../../../custom-field/InputField/index";

class RatingForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            openAlert:false,
            content:"Loading...",
            type: "info",
        };
        this.initialValues = {
            star:"",
            contentRating:""
        };
        this.validationSchema = Yup.object().shape({
            star:Yup.string().required("Vui lòng không để trống."),
            contentRating:Yup.string().required("Vui lòng không để trống."),
        });
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(values){
        this.setState({openAlert:true});
        let formData = new FormData();
        formData.set("star",values.star);
        formData.set("contentRating",values.contentRating);
        
    }

    render(){
        return (
            <Formik 
                initialValues={this.initialValues}
                alidationSchema={this.validationSchema}
                onSubmit={this.handleSubmit}
            >
                {(formikProps) =>{
                    return (
                        <Form>
                            <Grid container spacing={3}>
                                <Grid item md={12} xs={12}>
                                    <h3>Đánh giá sao *</h3>
                                    <RatingProduct/>
                                </Grid>
                                <Grid item md={12} xs={12} >
                                    <FastField
                                        category="multiple"
                                        name="contentRating"
                                        component={InputField}
                                        label="Ý kiến của bạn *"
                                        row={9}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                    }}
                                >
                                    <Button
                                        color="primary"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Xác nhận
                                    </Button>
                                </Grid>
                                <Snackbar
                                    open={this.state.openAlert}
                                    autoHideDuration={6000}
                                    onClose={() => {
                                        this.setState({ openAlert: false });
                                    }}
                                >
                                    <Alert
                                        onClose={() => {
                                            this.setState({ openAlert: false });
                                        }}
                                        severity="warning"
                                    >
                                        {this.state.content}
                                    </Alert>
                                </Snackbar>
                            </Grid>
                        </Form>
                    )
                }}
            </Formik>
        )
    }
}
export default connect(null,null)(RatingForm)