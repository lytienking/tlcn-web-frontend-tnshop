import React,{ useEffect } from "react";
import ImageGallery from 'react-image-gallery';
import { connect, useDispatch } from "react-redux";
import { Row, Col } from "reactstrap";
import EPLlogo from "../../../../assets/images/EPLlogo.png";
import Bunlogo from "../../../../assets/images/Bundesligalogo.png";
import Ligue1logo from "../../../../assets/images/Ligue1logo.png";
import Laligalogo from "../../../../assets/images/Laligalogo.jpg";
import Serialogo from "../../../../assets/images/Serialogo.jpg";
import Slider from "../../../../assets/images/slide.png";
import shirtsApi from "../../../../api/shirtsApi";
import {getNews} from "../../../../actions/shirts";
import ShirtCard from "../../../../components/ShirtCard/ShirtCard";
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ScrollTop from "../../../../components/ScrollTop/ScrollTop";
import "./styles.scss"
const HomePage =(props) =>{
    
    const images = [
        {
            original:Slider,
        },
        {
          original: 'https://iweb.tatthanh.com.vn/pic/12/banner/148938_10151250754648445_1311467715_n.jpg',
          
        },
        {
          original: 'https://iweb.tatthanh.com.vn/pic/12/banner/Untitled-2.png',
          
        },
        {
            original:'https://iweb.tatthanh.com.vn/pic/12/banner/Untitled-1.png',
        },
        
      ];
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const response = await shirtsApi.getNew();
                console.log("resnew",response)
                let action = await getNews(response);
                dispatch(action);
                console.log(dispatch(action))
            } catch (error) {
                console.log(`failed post register as ${error}`);
            }
        })();
        return () => {
            // before effect and unmount
        };
    }, []);
    console.log("ac",props.shirtsNew);
    return (
        <React.Fragment>
            <Toolbar id="back-to-top-anchor" />
            <div >
            <Row className="aHead">
                <Col xs={12} className="imageGallery">
                    <ImageGallery items={images} autoPlay={false} showThumbnails = {false} />;
                </Col>
            </Row>
            <div className="logo">
                <Row>
                    <Col ><img src={EPLlogo} width={100} alt="logo" /></Col>
                    <Col><img src={Bunlogo} width={120} alt="logo" /></Col>
                    <Col><img src={Laligalogo} width={180} alt="logo" /></Col>
                    <Col><img src={Ligue1logo} width={120} alt="logo" /></Col>
                    <div className="seria">
                        <Col><img src={Serialogo} width={100} alt="logo" /></Col>
                    </div>
                </Row>
            </div>
            <div className="new-product">
                <h3>Sản phẩm mới nhất</h3>
                <Row xs={12} >
                    {props.shirtsNew.map && props.shirtsNew.map((item) => (
                        <Col xs={3} key={item._id}>
                            <ShirtCard shirt={item}/>
                        </Col>
                    ))}
                </Row>
                
            </div>
        </div>
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
        </ScrollTop>           
        </React.Fragment>
        
    );
};
const mapStateToProps = (state) => ({ 
    shirtsNew: state.shirts.shirtsNew,
});

export default connect(mapStateToProps, null)(HomePage);