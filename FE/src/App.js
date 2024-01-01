import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import InfoProduct from './page/InfoProduct'
import Question from './page/Question'
import Contact from './page/Contact'
import Cart from './page/Cart'
import Login from './page/Login'
import Register from './page/Register'
import SearchProduct from './page/SearchProduct'
import Manager from './page/Manager/Manager'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/infoProduct/:id" element={<InfoProduct />} />
                <Route path="/question" element={<Question />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/searchProduct" element={<SearchProduct />} />
                <Route path="/manager" element={<Manager />} />
            </Routes>
        </Router>
    )
}

export default App
