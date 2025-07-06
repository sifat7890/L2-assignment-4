import { Outlet } from "react-router";
import Navbar from "./layout/navbar";
import Footer from "./layout/footer";


function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default App;