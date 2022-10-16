import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate,use } from 'react-router-dom';
import Try from './components/Try';
import { AppAuthContext } from './contex/AppAuthContexProvider';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import PostRumor from './pages/PostRumor';
import SearchResultsPage from './pages/SearchResultsPage';
import UserPage from './pages/UserPage';
import { checkinitialAuthAction } from './store/authStore';
import routerSlice from './store/routerStore';
import "./style.scss"
var dlink="/";
function App() {
  const authState = useSelector((state) => state.auth);
  // const navigate = useNavigate();
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkinitialAuthAction());
  }, []);
  const ProtectedHomeRoute = ({ children }) => {
    console.log("navi to /log " + authState.signedin,);
    if (!authState.signedin) {
      dlink=window.location.pathname;
      // dispatch(routerSlice.actions.setRoute(window.location.pathname))
      console.log("isLoged In    ssssssss", authState.signedin);
      
      return <Navigate to="/login" replace={true} />;
    }
    
    else {
     if (dlink!="/"){ 
      var temp=dlink;
      console.log("navigating to ",dlink);
      dlink="/";
      return <Navigate to={temp} replace={true} />;
    }
      return children;
     }
  }

  return (

    <BrowserRouter>
      {/* <h1>Is Loged In: {authState.signedin.toString()}</h1> */}
      <Routes>
        <Route  path='/'>
          <Route index element={<ProtectedHomeRoute><HomePage /></ProtectedHomeRoute>} replace={true}  ></Route>
          <Route path='postRumor' element={<ProtectedHomeRoute><PostRumor /></ProtectedHomeRoute>} replace={false}></Route>
          <Route path='user/:uid' element={<ProtectedHomeRoute><UserPage/></ProtectedHomeRoute>} replace={false}></Route>
          <Route path='search/:query' element={<ProtectedHomeRoute><SearchResultsPage/></ProtectedHomeRoute>} replace={false}></Route>
          <Route path='login' element={<LogInPage />}></Route>
          <Route path='try' element={<Try />}></Route>
          <Route path="*" element={<h1> Invalid URL</h1>}></Route>
        </Route>
        {/* <Route path="/redirect" element={ <h1>No Route</h1> } /> */}

      </Routes>
    </BrowserRouter>
  )




}

export default App;
