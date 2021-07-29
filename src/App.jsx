import React from 'react';
// import './App.css'
import {Container} from 'react-bootstrap';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import ListToko from './components/ListToko.jsx';
import AddToko from './components/AddToko.jsx';
import EditToko from './components/EditToko.jsx';
import StokToko from './components/StokToko.jsx';
import ListDorayaki from './components/ListDorayaki.jsx';
import AddDorayaki from './components/AddDorayaki.jsx';
import EditDorayaki from './components/EditDorayaki.jsx';
import Transfer from './components/Transfer.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Container>
          <Switch>
            <Route path="/toko/add" component={AddToko} />
            <Route path="/toko/edit" component={EditToko} />
            <Route path="/toko/stok" component={StokToko} />
            <Route path="/toko" component={ListToko} />
            <Route path="/dorayaki/add" component={AddDorayaki} />
            <Route path="/dorayaki/edit" component={EditDorayaki} />
            <Route path="/dorayaki" component={ListDorayaki} />
            <Route path="/transfer" component={Transfer} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
