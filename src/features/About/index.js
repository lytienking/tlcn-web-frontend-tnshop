import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from '../About/components/Header';
import PlaceToVisit from '../About/components/PlaceToVisit';
import GuestLayout from "../../components/Layout/guest/GuestLayout.js";
import BackgroundImage from "../../assets/images/Background.png"
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize:'100% 100%'
  },
}));
export default function About() {
  const classes = useStyles();
  return (
    <GuestLayout>
        <div className={classes.root}>
            <CssBaseline />
            <Header />
            <PlaceToVisit />
        </div>
    </GuestLayout>
    
  );
}