import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './addmin/Admin.jsx'
import Login from './addmin/Login.jsx';
import App from './App.jsx';
import AdminSlide from './addmin/AdminSlide.jsx';
import ProtectRout from './ProtectRout.jsx';
import AdminBlog from './addmin/AdminbBlog.jsx';

import BlogPage from './Page/BlogPage.jsx';
import HistoryPage from './Page/HistoryPage.jsx';
import ManagerPage from './Page/ManagerPage.jsx';
import PersonPage from './Page/Person.jsx';
import GalleryPage from './Page/็GalleryPage..jsx';
import ContactPage from './Page/ContactPage.jsx';
import TargetPage from './Page/TargetPage.jsx';
import Student from './Page/Student.jsx';
import Service from './Page/Service.jsx';
import Ita from './Page/Ita.jsx';
import AdminGallery from './addmin/AdminGallery.jsx';
import AdminManager from './addmin/AdminManager.jsx';
import AdminPerson from './addmin/AdminPerson.jsx';
import AdminStudent from './addmin/AdminStudent.jsx';
import AdminWork from './addmin/AdminWork.jsx';
import Question from './Page/Question.jsx';
import NewQ from './Page/NewQ.jsx';
import QuestionDetail from './Page/QuestionDetail.jsx';
import AdminQuestion from './addmin/AdminQuestion.jsx';
import AdminHistory from './addmin/AdminHistory.jsx';
import AdminTarget from './addmin/AdminTarget.jsx';
import AdminSymbol from './addmin/AdminSymbol.jsx';
import AdminDirector from './addmin/AdminDirector.jsx';
import AdminCount from './addmin/AdminCount.jsx';
import AdminSoloImg from './addmin/AdminSoloImg.jsx';
import AdminIta from './addmin/AdminIta.jsx';

import MusicPage from './Page/MusicPage.jsx';
import Studentcouncil from './Page/Studentcouncill.jsx';
import Educationboard from './Page/Educationboard.jsx';
import Personnelinform from './Page/Personnelinform.jsx';
import AdminEducationboard from './addmin/AdminEducationboard.jsx';
import AdminStudentcouncil from './addmin/AdminStudentcouncil.jsx';
import AdminPersonnelinform from './addmin/AdminPersonnelinform.jsx';
import GalleryDetail from './Page/GalleryDetail.jsx';
import PostDetail from './compornent/PostDetail.jsx';
import AdminConfig from './addmin/AdminConfig.jsx';



export default function Browser() {
    return (
        <div className='font-thai'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />} />
                    
                    <Route element={<ProtectRout />}>
                        <Route path='/Admin' element={<Admin />} />
                        <Route path='/AdminSlide' element={<AdminSlide />} />
                        <Route path='/AdminBlog' element={<AdminBlog />} />
                        
                        <Route path='/AdminGallery' element={<AdminGallery />} />
                        <Route path='/AdminManager' element={<AdminManager />} />
                        <Route path='/AdminPerson' element={< AdminPerson />} />
                        <Route path='/AdminStudent' element={< AdminStudent />} />
                        <Route path='/AdminWork' element={< AdminWork />} />
                        <Route path='/AdminQuestion' element={<AdminQuestion />} />
                        <Route path='/AdminHistory' element={<AdminHistory />} />
                        <Route path='/AdminTarget' element={<AdminTarget />} />
                        <Route path='/AdminSymbol' element={<AdminSymbol />} />
                        <Route path='/AdminDirector' element={<AdminDirector />} />
                        <Route path='/AdminCount' element={<AdminCount />} />
                        <Route path='/AdminSoloImg' element={<AdminSoloImg />} />
                        <Route path='/AdminSoloImg' element={<AdminSoloImg />} />
                        <Route path='/AdminSoloImg' element={<AdminSoloImg />} />
                        <Route path='/AdminIta' element={<AdminIta />} />
                        <Route path='/AdminEducationboard' element={<AdminEducationboard />} />
                        <Route path='/AdminStudentcouncil' element={<AdminStudentcouncil />} />
                        <Route path='/AdminPersonnelinform' element={<AdminPersonnelinform />} />
                        <Route path='/AdminConfig' element={<AdminConfig />} />
                        
                       
                        
                    </Route>

                    
                    <Route path='/Login' element={<Login />} />
                    <Route path='/BlogPage' element={<BlogPage />} />
                    <Route path='/HistoryPage' element={<HistoryPage />} />
                    <Route path='/ManagerPage' element={<ManagerPage />} />
                    <Route path='/PersonPage' element={<PersonPage />} />
                    <Route path='/GalleryPage' element={<GalleryPage />} />
                    <Route path='/ContactPage' element={<ContactPage />} />
                    <Route path='/TargetPage' element={<TargetPage />} />
                    <Route path='/Student' element={<Student/>} />
                    <Route path='/Service' element={<Service/>} />
                    <Route path='/MusicPage' element={<MusicPage/>} />
                    <Route path='/Ita' element={<Ita/>} />
                    <Route path='/Question' element={< Question/>} />
                    <Route path='/Question/NewQ' element={<NewQ/>} />
                    <Route path='/GalleryPage/GalleryDetail/:id' element={<GalleryDetail/>} />
                    <Route path="/Question/Detail/:id"  element={<QuestionDetail/>} />
                    <Route path="/BlogPage/Post/Detail/:id"  element={< PostDetail/>} />
                    <Route path="/Educationboard"  element={<Educationboard/>} />
                    <Route path="/Studentcouncil"  element={< Studentcouncil/>} />
                    <Route path="/Personnelinform"  element={< Personnelinform/>} />
                 
                </Routes>
            </BrowserRouter>
        </div>
    )
}