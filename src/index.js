import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import Firebase, { FirebaseContext } from './components/Firebase';

const app = (
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
