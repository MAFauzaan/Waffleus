import { useSelector } from 'react-redux'

import AdminLogin from './login/AdminLogin'
import Dashboard from './dashboard/Dashboard'

const Admin = () => {
    const isAdminLoggedIn = useSelector(state => state.admin.isInitialized)
    console.log(isAdminLoggedIn)

    return(
        isAdminLoggedIn ?
        <Dashboard />
        :
        <AdminLogin />

    )
}

export default Admin