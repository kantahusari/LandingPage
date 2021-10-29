import React from 'react'
import '../../App.css'
//import Middle from '../Middle'
//import InfoSection from '../../InfoSection/Info';
//import { homeObjOne, homeObjthree, homeObjtwo } from '../../InfoSection/Data';

import Section from '../Section'
import Footer from "../Footer";
import Navbar from "../Navbar"

function Home() {
    return (
        <>
            <Navbar />
            <Section />
            <Footer />
        </>
    )
}

export default Home
