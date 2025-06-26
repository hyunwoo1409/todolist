import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Wishlist from './pages/Wishlist';
import MyPage from './pages/MyPage';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}