import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch } from "react-router-dom"

import Login from "./auth/Login"
import SignUp from "./auth/SignUp"
import Profile from "./auth/Profile"
import Contact from "./auth/Contact"
import Dashboard from "./drive/Dashboard"
import PrivateRoute from "./auth/PrivateRoute"
import UpdateProfile from "./auth/UpdateProfile"
import ForgotPassword from "./auth/ForgotPassword"
import NonPrivateRoute from "./auth/NonPrivateRoute"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* Drive */}
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/folder/:folderId" component={Dashboard} />

          {/* User */}
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/contact" component={Contact} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />

          {/* Auth */}
          <NonPrivateRoute path="/login" component={Login} />
          <NonPrivateRoute path="/signup" component={SignUp} />
          <NonPrivateRoute path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
