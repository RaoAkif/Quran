import Home from '../Pages/Home';
import About from '../Pages/About';
import Contact from '../Pages/Contact'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


export const RouterConfig = () =>
    <div>

      <Router>
        <div style={{ textAlign: 'center' }}>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/About">About</Link>
              </li>
              <li>
                <Link to="/Contact">Contact</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/About">
              <About />
            </Route>
            <Route path="/Contact">
              <Contact />
            </Route>
          </Switch>
        </div>
      </Router>
      
    </div>

export default RouterConfig;

