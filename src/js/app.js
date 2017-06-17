import {React, ReactDOM, Router, Route, Link} from './vendor';
import Main from './Main';
import About from './About';
import '../css/base.css';
import '../css/app.css';

ReactDOM.render((
  <Router>
    <div className='wrapper'>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
      </ul>
      <Route exact path='/' component={Main} />
      <Route path='/about' component={About} />
    </div>
  </Router>
), document.getElementById('app'));
