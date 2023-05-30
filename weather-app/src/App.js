import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Dashboard } from "./containers/Dashboard";
import { Favourites } from "./containers/Favourites";
import { WeatherProvider } from "./context/WeatherProvider";

function App() {

  return (
      <WeatherProvider>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<Dashboard />} />
                  <Route path='/favourites' element={<Favourites />} />
              </Routes>
          </BrowserRouter>
      </WeatherProvider>
  );
}

export default App;
