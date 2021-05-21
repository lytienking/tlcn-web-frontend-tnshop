import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Footer.scss";
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
    },
    
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(1, 2),
        marginTop: "auto",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
    },
}));

export default function StickyFooter() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <footer className={classes.footer}>
                {/* <div className="footer">
                    <div className="nav-item">
                        <Link to="/" className="item">
                            Trang Chủ
                        </Link>
                        <Link to="/" className="item">
                            Tất cả sản phẩm
                        </Link>
                    </div>
                </div> */}
        
                <p>© {new Date().getFullYear()} Bản quyền của công ty TN Sport Shop</p>
                <p>All Right Reserved.</p>
            </footer>
        </div>
    );
}