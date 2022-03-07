
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom";
import "../styles/Navbar.css"
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
const NavHeader = (props) => {
  const { logout } = props
  const history = useHistory()
  const dispatch = useDispatch();
  return (
    <div className="container-fluid menu">
      <Navbar expand="lg">
        <Navbar.Brand>
          <h3>Product List </h3>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">


          {!props.isAuthenticated && (
            <Nav className="float-right">
              <li className="nav-item" >
                <Link to="/login" className="navlink">
                  <span className={history.location.pathname === "/login" ? "nav-link active" : "nav-link"}>Login</span>
                </Link>
              </li>
              <li className="nav-item" >
                <Link to="/register" className="navlink">
                  <span className={history.location.pathname === "/register" ? "nav-link active" : "nav-link"}>Register</span>
                </Link>
              </li>

            </Nav>

          )}

          {props.isAuthenticated &&
            <Nav className="float-right">
              <li className="nav-item" >
                <Link to="/home" className="navlink">
                  <span className={history.location.pathname === "/home" ? "nav-link active" : "nav-link"}>Home</span>
                </Link>
              </li>
              <li className="nav-item" >
                <Link to="/login" className="navlink">
                  <span className={history.location.pathname === "/login" ? "nav-link active" : "nav-link"}
                    onClick={() => logout()}>Logout</span>
                </Link>
              </li>
            </Nav>
          }

        </Navbar.Collapse>

      </Navbar>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
      isAuthenticated: state.auth.isAuthenticated,
  };
};

export default withRouter(connect(mapStateToProps)(NavHeader));