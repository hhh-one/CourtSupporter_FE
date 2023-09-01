import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import * as style from 'style'
import * as utils from 'utils'
import * as pages from 'pages'
import * as hooks from 'hooks'

const App = () => {
  return (
    <ThemeProvider theme={style.Theme}>
      <style.GlobalStyles />
      <Router>
        <Routes>
          <Route path={utils.URL.HOME.SIGNIN} element={<pages.Signin />} />
          <Route path={utils.URL.HOME.JOINACCEPT} element={<pages.JoinAccept />} />
          <Route path={utils.URL.HOME.JOIN} element={<pages.Join />} />
          <Route path={utils.URL.HOME.JOINSUCCESS} element={<pages.JoinSuccess />} />
          <Route path={'/address'} element={<hooks.addressHook />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
