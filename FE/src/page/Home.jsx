import React from 'react'
import Navbar from '../components/Navbar'
import ProductMain from '../components/ProductMain'
import Intro from '../components/Intro'
import Copyright from '../components/Copyright'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'
import Blank from '../components/Blank'

export default function Home() {
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <Carousel />
            <ProductMain />
            <Blank />
            <Intro />
            <Footer />
            <Copyright />
        </div>
    )
}
