import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppAuthContext } from './contex/AppAuthContexProvider';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import "./style.scss"
function App() {
  const {appAuth,currentUser}=useContext(AppAuthContext);
console.log(currentUser);
const ProtectedHomeRoute=({children})=>{
  if (!(currentUser && currentUser.emailVerified)){
    return <Navigate to="/login"/>;
  }
  return children;
}
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<ProtectedHomeRoute><HomePage /></ProtectedHomeRoute>}></Route>
          <Route path='login' element={<LogInPage />}></Route>
          {/* <Route path={"*"}>{ <h1>No Route</h1>}</Route> */}
         
        </Route>
          {/* <Route path="/redirect" element={ <h1>No Route</h1> } /> */}
      
      </Routes>
    </BrowserRouter>
  )
  
}

export default App;
