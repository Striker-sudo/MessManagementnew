import LoginPage from "./Login.jsx";
import Signup from "./Signup.jsx";
import OTPPage from "./OTP.jsx";
import ComplaintForm from "./complaintForm.jsx";
import TrackComplaintsPage from "./TrackComplaint.jsx"
 

function App(){
    return(
 
           <>
           <Signup/>
            <LoginPage/>
            <OTPPage/>
            <ComplaintForm/>
            <TrackComplaintsPage/>
           </> 
 
    );
}

export default App
