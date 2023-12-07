import React from 'react'
import Navbar from '../components/Navbar'
import ProductMain from '../components/ProductMain'
import Intro from '../components/Intro'
import Copyright from '../components/Copyright'
import Footer from '../components/Footer'

export default function Home() {
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <ProductMain />
            <Intro />
            <Footer />
            <Copyright />
        </div>
    )
}
