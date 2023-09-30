import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";


// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

// import AddTutorial from "./components/add-tutorial.component";
// import Tutorial from "./components/tutorial.component";
// import TutorialsList from "./components/tutorials-list.component";

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import AddAlumno from "./components/add-alumno.component";
import AddPadrefamilia from "./components/add-padrefamilia.component";
import AlumnosListado from "./components/alumnos.component";
import TutoresListado from "./components/tutores.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
    
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary">
        <a class="navbar-brand" href="/">
    <img src="/business_logoss.png" className="img-responsive" id="logo" alt=""/>
    
        </a>
        {/* <Link to={"/home"} className="navbar-brand">
            PREPARATORIA
          </Link> */}
          <div className="navbar-nav mr-auto" style={{ marginLeft: '5%'}}>
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                INICIO
              </Link>
            </li> 

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}
            
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  NOTIFICACIONES
                </Link>
              </li>
              
            )}

    
 
            {/* {showAdminBoard && (
              <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Alumnos y P.F.
              </Link>
              </li>
            )}   */}

            {showModeratorBoard && (
              <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
              </li>
            )}  
            
            {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/addAlumno"} className="nav-link">
                AGREGAR ALUMNO
              </Link>
            </li>
            )}
            
            {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/addAlumno"} className="nav-link">
                AGREGAR ALUMNO
              </Link>
            </li>
            )}

            {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/addPadrefamilia"} className="nav-link">
                AGREGAR TUTOR
              </Link>
            </li>
            )}
            
            {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/addPadrefamilia"} className="nav-link">
                AGREGAR TUTOR
              </Link>
            </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  USER
                </Link>
              </li>
            )} 
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/home" className="nav-link" onClick={this.logOut}>
                  SALIR
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  LOGIN
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  REGISTRARSE
                </Link>
              </li>
            </div>
            
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/alumnos" element={<AlumnosListado />} />
            <Route path="/tutores" element={<TutoresListado />} />
            <Route path="/" element={<TutorialsList/>} />
            <Route path="/tutorials" element={<TutorialsList/>} />
            <Route path="/add" element={<AddTutorial/>} />
            <Route path="/addAlumno" element={<AddAlumno/>} />
            <Route path="/addPadrefamilia" element={<AddPadrefamilia/>} />
            <Route path="/tutorials/:id" element={<Tutorial/>} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
