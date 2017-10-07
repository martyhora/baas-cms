import 'script-loader!../node_modules/admin-lte/plugins/jQuery/jquery-2.2.3.min';
import 'script-loader!../node_modules/admin-lte/bootstrap/js/bootstrap.min';
import 'script-loader!../node_modules/admin-lte/dist/js/app.min';

import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';

import ParameterListContainer from './components/Parameter/ParameterListContainer';
import ParameterFormContainer from './components/Parameter/ParameterFormContainer';
import SectionListContainer from './components/Section/SectionListContainer';
import SectionFormContainer from './components/Section/SectionFormContainer';
import ContentListContainer from './components/Content/ContentListContainer';
import ContentFormContainer from './components/Content/ContentFormContainer';

render(
  <HashRouter>
    <div className="wrapper">
      <header className="main-header">
        <a href="" className="logo">
          <span className="logo-mini">
            <b>Universal BaaS</b> CMS
          </span>

          <span className="logo-lg">
            <b>Universal BaaS</b> CMS
          </span>
        </a>

        <nav className="navbar navbar-static-top" role="navigation">
          <div className="navbar-custom-menu" />
        </nav>
      </header>
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
                  <Link to="/parameter">Parametry</Link>
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

      <div className="content-wrapper">
        <section className="content-header">
          <Route exact name="parameter" path="/parameter" component={ParameterListContainer} />
          <Route name="parameter-add" path="/parameter/add" component={ParameterFormContainer} />
          <Route
            name="parameter-edit"
            path="/parameter/edit/:id"
            component={ParameterFormContainer}
          />

          <Route exact name="section" path="/section" component={SectionListContainer} />
          <Route name="section-add" path="/section/add" component={SectionFormContainer} />
          <Route name="section-edit" path="/section/edit/:id" component={SectionFormContainer} />

          <Route exact name="content" path="/content" component={ContentListContainer} />
          <Route name="content-add" path="/content/add" component={ContentFormContainer} />
          <Route name="content-edit" path="/content/edit/:id" component={ContentFormContainer} />
        </section>

        <section className="content" />
      </div>

      <footer className="main-footer">
        <div className="pull-right hidden-xs" />

        <strong>Copyright &copy; 2017</strong>
      </footer>

      <div className="control-sidebar-bg" />
    </div>
  </HashRouter>,
  document.getElementById('app')
);
