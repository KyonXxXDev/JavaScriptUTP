import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MainPage from '../components/Main/components/MainPage';
import MainNosotros from '../components/Main/components/MainNosotros';
import MainIple from '../components/Main/components/MainIple';
import MainLucesEmergencia from '../components/Main/components/MainLucesEmergencia';
import MainAbs from '../components/Main/components/MainAbs';
import ScrollTop from '../components/ScrollTop';

export default function AppRouter(){
    return(
    <Router>
        <ScrollTop/>
        <Routes>
            <Route path="/" element={<Home />}>
                <Route index element={<MainPage />} />
                <Route path="luces" element={<MainLucesEmergencia />} />
                <Route path="luces/iple" element={<MainIple />} />
                <Route path="luces/abs" element={<MainAbs />} />
                <Route path="nosotros" element={<MainNosotros />} />
            </Route>
        </Routes>
    </Router>
    )
}