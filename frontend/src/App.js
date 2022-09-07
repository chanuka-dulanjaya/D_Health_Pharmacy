import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Admin from './pages/Admin';
import UserAdminDashboard from './pages/UserAdminDashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DocAndOrdersDashboard from './pages/Doctors&Orders/doctorsAndOrdersDashbord';
import Doctoradd from './pages/Doctors&Orders/doctor.add';
import DoctorEdit from './pages/Doctors&Orders/docotr.edit';
import OrderDashboard from './pages/Doctors&Orders/orderDashboard';
import OrderReport from './pages/Doctors&Orders/orderReport';
import OrderView from './pages/Doctors&Orders/orderView';
import StockDashboard from './pages/Medicine&Stock/stockDashboard';
import MedicineAdd from './pages/Medicine&Stock/medicineAdd';
import StockReqManage from './pages/Medicine&Stock/stockReqManage';
import MedicineEdit from './pages/Medicine&Stock/medicineEdit';
import StockReqEdit from './pages/Brand&Stockreq/stockReqEdit';
import BrandAdd from './pages/Brand&Stockreq/BrandAdd';
import BrandEdit from './pages/Brand&Stockreq/brandEdit';
import StockReqAdd from './pages/Brand&Stockreq/srockReq.add';
import BrandStockreqDashboard from './pages/Brand&Stockreq/Product Brand & Stock request Management';
import MedCentersAbookashboad from './pages/MedicalCenters&Booking/medCentersAbookashboad';
import MedicalcenterAdd from './pages/MedicalCenters&Booking/medicalcenterAdd';
import BookingDashboard from './pages/MedicalCenters&Booking/bookingDashboard';
import ChanelCenterEdit from './pages/MedicalCenters&Booking/medicalCenterEdite';
import BookingReport from './pages/MedicalCenters&Booking/bookingReport';
import ChannelBookingEdit from './pages/MedicalCenters&Booking/channelBookingEdit';
import ChannelBooking from './pages/MedicalCenters&Booking/channelBooking';
import FeedbackDashboard from './pages/Feedback/feedback.dashboard';
import EditFeedback from './pages/Feedback/user.feedback.edit';
import FeedbackView from './pages/Feedback/feedback.view';
import Feedback from './pages/Feedback/user.feedback';
import FeedbackReport from './pages/Feedback/feedback.report';
import YourFeedback from './pages/Feedback/user.feedback.your';
import UserProfile from './pages/UserProfile/user.profile';
import UserProfEdit from './pages/UserProfile/user.profile.edit';
import UserMedicalCenters from './pages/MedicalCenters&Booking/userMedicalCenters';
import HomeRoute from './components/HomeRoute';
import Buyone from './pages/Doctors&Orders/buy.one';
import UserPayment from './pages/payment/userPayment';
import PaymentView from './pages/payment/paymentView';
import UserPayDash from './pages/payment/userPayDash';



function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <BrowserRouter>
      {loading && (<div class="spinner-parent">
        <div class="spinner-border" role="status">

        </div>
      </div>)}
      <Toaster position='top-center' reverseOrder={false} />
      <Routes>
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path='/' element={<HomeRoute><Home /></HomeRoute>} />
        <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path='/user' element={<ProtectedRoute><UserAdminDashboard /></ProtectedRoute>} />

        {/* doctor routes and Order*/}
        <Route path='/DocOrderDas' element={<ProtectedRoute><DocAndOrdersDashboard /></ProtectedRoute>} />
        <Route path='/DocAdd' element={<ProtectedRoute><Doctoradd /></ProtectedRoute>} />
        <Route path='/DocEdit' element={<ProtectedRoute><DoctorEdit /></ProtectedRoute>} />
        <Route path='/orderdas' element={<ProtectedRoute><OrderDashboard /></ProtectedRoute>} />
        <Route path='/orderreport' element={<ProtectedRoute><OrderReport /></ProtectedRoute>} />
        <Route path='/orderview' element={<ProtectedRoute><UserPayDash /></ProtectedRoute>} />
        <Route path='/userOrderView' element={<ProtectedRoute><OrderView /></ProtectedRoute>} />
        <Route path='/buyOne' element={<Buyone />} />

        {/* stock dashboard */}
        <Route path='/stockDash' element={<ProtectedRoute><StockDashboard /></ProtectedRoute>} />
        <Route path='/addMed' element={<ProtectedRoute><MedicineAdd /></ProtectedRoute>} />
        <Route path='/editMed' element={<ProtectedRoute><MedicineEdit /></ProtectedRoute>} />
        <Route path='/stockReqManage' element={<ProtectedRoute><StockReqManage /></ProtectedRoute>} />

        {/* brand dashboard */}
        <Route path='/brandandstockDas' element={<ProtectedRoute><BrandStockreqDashboard /></ProtectedRoute>} />
        <Route path='/stockReqEdit' element={<ProtectedRoute><StockReqEdit /></ProtectedRoute>} />
        <Route path='/stockReqAdd' element={<ProtectedRoute><StockReqAdd/></ProtectedRoute>} />
        <Route path='/brandAdd' element={<ProtectedRoute><BrandAdd /></ProtectedRoute>} />
        <Route path='/brandEdit' element={<ProtectedRoute><BrandEdit /></ProtectedRoute>} />


        {/* Medical centers and Booking */}
        <Route path='/medCenAndBookDas' element={<ProtectedRoute><MedCentersAbookashboad /></ProtectedRoute>} />
        <Route path='/medCenterAdd' element={<ProtectedRoute><MedicalcenterAdd/></ProtectedRoute>} />
        <Route path='/medCenterEdit' element={<ProtectedRoute><ChanelCenterEdit/></ProtectedRoute>} />
        <Route path='/bookDas' element={<ProtectedRoute><BookingDashboard /></ProtectedRoute>} />
        <Route path='/brandEdit' element={<ProtectedRoute><BrandEdit /></ProtectedRoute>} />
        <Route path='/bookingReport' element={<ProtectedRoute><BookingReport /></ProtectedRoute>} />
        <Route path='/bookingEdit' element={<ProtectedRoute><ChannelBookingEdit /></ProtectedRoute>} />
        <Route path='/bookingAdd' element={<ProtectedRoute><ChannelBooking /></ProtectedRoute>} />
        <Route path='/allMedicalCent' element={<ProtectedRoute><UserMedicalCenters /></ProtectedRoute>} />

        {/* Feedback Management */}

        <Route path='/feedbackDash' element={<ProtectedRoute><FeedbackDashboard /></ProtectedRoute>} />
        <Route path='/feedbackDEdit' element={<ProtectedRoute><EditFeedback /></ProtectedRoute>} />
        <Route path='/feedBackView' element={<ProtectedRoute><FeedbackView /></ProtectedRoute>} />
        <Route path='/feedbackUser' element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
        <Route path='/feedbackReport' element={<ProtectedRoute><FeedbackReport /></ProtectedRoute>} />
        <Route path='/feedbackYour' element={<ProtectedRoute><YourFeedback /></ProtectedRoute>} />
        

        {/* User Profile */}
        
        <Route path='/userProfileEdit' element={<ProtectedRoute><UserProfEdit /></ProtectedRoute>} />
        <Route path='/userProfile' element={<ProtectedRoute>< UserProfile/></ProtectedRoute>} />


        {/* payment */}

        <Route path='/Payment' element={<ProtectedRoute>< UserPayment/></ProtectedRoute>} /> 
        <Route path='/PaymentView' element={<ProtectedRoute>< PaymentView/></ProtectedRoute>} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
