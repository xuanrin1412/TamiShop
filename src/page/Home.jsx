import React from 'react'
import Navbar from '../components/Navbar'
import ProductMain from '../components/ProductMain'
import Intro from '../components/Intro'
import Contact from '../components/Contact'
import Copyright from '../components/Copyright'

export default function Home() {
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <ProductMain />
            <Intro />
            <Contact />
            <Copyright />
        </div>
    )
}
