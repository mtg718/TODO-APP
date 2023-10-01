
import './App.css'
import Header from './components/parts/Header.jsx';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import HomePage from './components/parts/HomePage.jsx';
import Register from './components/parts/Register.jsx';
import Login from './components/parts/Login.jsx';
import { useState } from 'react';

function App() {


  const info = localStorage.getItem('user');
const[user,setUser] = useState(JSON.parse(info))
  return (

    <>
      <BrowserRouter>
        {/* <Header /> */}

        <Routes>
<Route exact path="/" element={<HomePage/>}/>
<Route exact path="/register" element={<Register/>}/>
<Route exact path="/login" element={<Login user={user} setUser={setUser}/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
