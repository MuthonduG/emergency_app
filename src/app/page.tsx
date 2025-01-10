import Dashboard from "./Dashboard/page";
import Department from "./Department/page";
import Device from "./Device/page";
import Landing from "./Users/page";
import Login from "./Login/page";
import Devicelogin from "./Devicelogin/page";
import SignUp from "./SignUp/page";
import Profile from "./Profile/page";
import Setting from "./Setting/page";
import Technician from "./Technician/page";

export default function Home() {
  return (
    <div className="">
      {/* <Login></Login> */}
      <Landing></Landing>
    </div>
  );
}
