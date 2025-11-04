import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/layout/auth/authLayout.jsx'
import Login from './pages/auth/login.jsx'
import Register from './pages/auth/register.jsx'
import AdminLayout from './components/layout/admin-view/layout.jsx'
import AdminDashboard from './pages/admin-view/dashboard.jsx'
import AdminFeatures from './pages/admin-view/features.jsx'
import AdminOrders from './pages/admin-view/orders.jsx'
import AdminProducts from './pages/admin-view/products.jsx'
import ShoppingLayout from './components/layout/shopping-view/layout.jsx'
import NotFound from './pages/not-found/index.jsx'
import ShoppingHome from './pages/shopping-view/home.jsx'
import ShoppingListing from './pages/shopping-view/listing.jsx'
import ShoppingCheckout from './pages/shopping-view/checkout.jsx'
import ShoppingAccount from './pages/shopping-view/account.jsx'
import CheckAuth from './components/common/checkauth.jsx'
import UnAuthPage from './pages/unauth-page/index.jsx'


function App() {

  const isAuthenticated = false;
  const user = {
    name:"Sangam",
    role:"user"
  };
 
  return (
    <div className="flex flex-col overflow-hidden bg-white">
    <Routes>
      <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout/></CheckAuth>}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path='/admin' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout/></CheckAuth>}>
      <Route path='dashboard' element={<AdminDashboard/>}></Route>
      <Route path='features'  element={<AdminFeatures/>}></Route>
      <Route path='orders' element={<AdminOrders/>}></Route>
      <Route path='products' element={<AdminProducts/>}></Route>
      </Route>

      <Route path='/shop' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingLayout/></CheckAuth>}>
      <Route path='home' element={<ShoppingHome/>}></Route>
      <Route path='listing' element={<ShoppingListing/>}></Route>
      <Route path='checkout' element={<ShoppingCheckout/>}></Route>
      <Route path='account' element={<ShoppingAccount/>}></Route>
       </Route>

     
      <Route path="/unauth-page" element={<UnAuthPage/>}></Route>
       <Route path="*" element={<NotFound/>}></Route>

    


    </Routes>
    </div>
  )
}

export default App
