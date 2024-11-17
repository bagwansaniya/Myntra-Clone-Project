import { Outlet } from "react-router-dom";
import "./App.css";
import Display_Items from "../components/Display_Items";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Items from "./Homeitems";
import Fetching from "../components/fetching";
import Loader from "../components/loader";
import { useSelector } from "react-redux";

function App1() {
  const fetchstatus = useSelector((store) => store.Fetchdata);
  return (
    <>
      <Header />
      <Fetching />
      {fetchstatus.fetchdone ? <Outlet /> : <Loader />}
      <Footer />
    </>
  );
}

export default App1;
