import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import InfoProduct from './page/InfoProduct'
import Question from './page/Question'
import Contact from './page/Contact'
import Cart from './page/Cart'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/infoProduct" element={<InfoProduct />} />
                <Route path="/question" element={<Question />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </Router>
    )
}

export default App