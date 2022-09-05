import "./Complaints_Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar_Complaints from "./Navbar_Complaints";
import Table_Complaints from "./Table_Complaints"
export default function Complaints_Home() {
  return (
    <div>
      <Navbar_Complaints/>
      <Table_Complaints/>
      <div style={{ height: '1000px'}}></div>
    </div>
  );
}
