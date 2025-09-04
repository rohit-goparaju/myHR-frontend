import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import About from './About';

export default function App(){
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}>
          <Route index element={<Login></Login>}></Route>
          <Route path="About" element={<About></About>}></Route>
        </Route>
      </Routes>
    </>
  );
}