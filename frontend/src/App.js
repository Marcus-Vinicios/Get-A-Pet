import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom' -> AddPet, UserAuth,

//Components
import Container from './components/layout/Container';
import Footer from './components/layout/Footer';
import Message from './components/layout/Message';
import Navbar from './components/layout/Navbar';

// Pages
import Home from './components/pages/Home';
import Profile from './components/pages/User/Profile';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import AddPet from './components/pages/pets/AddPet';
import MyAdoptions from './components/pages/pets/MyAdoptions';
import MyPets from './components/pages/pets/MyPets';
import PetDetails from './components/pages/pets/PetDetails';
import PetEdit from './components/pages/pets/PetEdit';

// Context
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/pet/mypets" element={<MyPets />} />
            <Route path="/pet/myadoptions" element={<MyAdoptions />} />
            <Route path="/pet/:id" element={<PetDetails />} />
            <Route path="/pet/add" element={<AddPet />} />
            <Route path="/pet/edit/:id" element={<PetEdit />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </UserProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
