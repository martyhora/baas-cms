import * as React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ParameterListContainer from './Parameter/ParameterListContainer';
import ParameterFormContainer from './Parameter/ParameterFormContainer';
import SectionListContainer from './Section/SectionListContainer';
import SectionFormContainer from './Section/SectionFormContainer';
import ContentListContainer from './Content/ContentListContainer';
import ContentFormContainer from './Content/ContentFormContainer';
import { IUser } from '../api/AuthApi';
import { logoutUser } from '../actions/auth';
import { LoginRoute, SecuredRoute } from '../routes';
import { APP_TITLE } from '../constants';
import {AppState} from '../reducers';

interface AppProps {
  userAuthenticated: boolean;
  logoutUser: () => void;
  user: IUser;
}

const App = ({ userAuthenticated, logoutUser, user }: AppProps) => (
  <Router>
    <div className="wrapper">
      {userAuthenticated && (
        <header className="main-header">
          <a href="" className="logo">
            <span className="logo-mini">
              <b>{APP_TITLE}</b>
            </span>

            <span className="logo-lg">
              <b>{APP_TITLE}</b>
            </span>
          </a>

          <nav className="navbar navbar-static-top" role="navigation">
            <a href="#" className="sidebar-toggle visible-xs" data-toggle="offcanvas" role="button">
              <span className="sr-only">Toggle navigation</span>
            </a>
            <div className="navbar-custom-menu">
              <ul className="nav navbar-nav">
                <li className="dropdown user user-menu">
                  <a href="" className="dropdown-toggle" data-toggle="dropdown">
                    {user.name}
                    {/*<img src="/images/user2-160x160.jpg" className="user-image" alt="User Image"/>*/}
                    <span className="hidden-xs" />
                  </a>
                  <ul className="dropdown-menu">
                    <li className="user-header">
                      {/*<img src="/images/user2-160x160.jpg" className="img-circle" alt="User Image"/>*/}
                      <p>{user.name}</p>
                    </li>
                  </ul>
                </li>
                <li>
                  <a style={{ cursor: 'pointer' }} onClick={logoutUser}>
                    <i className="fa fa-sign-out fa-fw" /> Logout
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      )}
      {userAuthenticated && (
        <aside className="main-sidebar">
          <section className="sidebar">
            <div className="user-panel">
              <div className="pull-left image" />
              <div className="pull-left info">
                <p />
                <a href="#">
                  <i className="fa fa-circle text-success" /> Online
                </a>
              </div>
            </div>

            <ul className="sidebar-menu">
              <li className="treeview">
                <a href="#">
                  <i className="fa fa-link" /> <span>Parametry</span>{' '}
                  <i className="fa fa-angle-left pull-right" />
                </a>
                <ul className="treeview-menu">
                  <li>
                    <Link to="/">Parametry</Link>
                  </li>
                  <li>
                    <Link to="/parameter/add">Nový parametr</Link>
                  </li>
                </ul>
              </li>

              <li className="treeview">
                <a href="#">
                  <i className="fa fa-link" /> <span>Sekce</span>{' '}
                  <i className="fa fa-angle-left pull-right" />
                </a>
                <ul className="treeview-menu">
                  <li>
                    <Link to="/section">Sekce</Link>
                  </li>
                  <li>
                    <Link to="/section/add">Nová sekce</Link>
                  </li>
                </ul>
              </li>
              <li className="treeview">
                <a href="#">
                  <i className="fa fa-link" /> <span>Obsah</span>{' '}
                  <i className="fa fa-angle-left pull-right" />
                </a>
                <ul className="treeview-menu">
                  <li>
                    <Link to="/content">Přehled obsahu</Link>
                  </li>
                  <li>
                    <Link to="/content/add">Nový obsah</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </section>
        </aside>
      )}

      <div className={`content-wrapper ${!userAuthenticated ? `content-wrapper--login` : ''}`}>
        <section className="content-header">
          <LoginRoute path="/login" userAuthenticated={userAuthenticated} />

          <SecuredRoute
            exact
            name="parameter"
            path="/"
            component={ParameterListContainer}
            userAuthenticated={userAuthenticated}
          />
          <SecuredRoute
            name="parameter-add"
            path="/parameter/add"
            component={ParameterFormContainer}
            userAuthenticated={userAuthenticated}
          />
          <SecuredRoute
            name="parameter-edit"
            path="/parameter/edit/:id"
            component={ParameterFormContainer}
            userAuthenticated={userAuthenticated}
          />

          <SecuredRoute
            exact
            name="section"
            path="/section"
            component={SectionListContainer}
            userAuthenticated={userAuthenticated}
          />
          <SecuredRoute
            name="section-add"
            path="/section/add"
            component={SectionFormContainer}
            userAuthenticated={userAuthenticated}
          />
          <SecuredRoute
            name="section-edit"
            path="/section/edit/:id"
            component={SectionFormContainer}
            userAuthenticated={userAuthenticated}
          />

          <SecuredRoute
            exact
            name="content"
            path="/content"
            component={ContentListContainer}
            userAuthenticated={userAuthenticated}
          />
          <SecuredRoute
            name="content-add"
            path="/content/add"
            component={ContentFormContainer}
            userAuthenticated={userAuthenticated}
          />
          <SecuredRoute
            name="content-edit"
            path="/content/edit/:id"
            component={ContentFormContainer}
            userAuthenticated={userAuthenticated}
          />
        </section>

        <section className="content" />
      </div>

      <footer className={`main-footer ${!userAuthenticated ? `main-footer--login` : ''}`}>
        <div className="pull-right hidden-xs" />

        <strong>Copyright &copy; 2017</strong>
      </footer>

      <div className="control-sidebar-bg" />
    </div>
  </Router>
);

export default connect(
  (state: AppState) => ({
    userAuthenticated: state.auth.authToken !== '',
    user: state.auth.user !== null ? state.auth.user : {},
  }),
  dispatch => ({
    logoutUser: () => {
      dispatch(logoutUser());
    },
  })
)(App);
