// import { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import HomeController from './controller/HomeController'
import EventController from './controller/EventController'
import PresentationController from './controller/PresentationController'
import LoginController from './controller/LoginController'
import SignUpController from './controller/SignUpController'
import NewEventController from './controller/NewEventController'
import NewPresentationController from './controller/NewPresentationController'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeController />} />
        <Route path="/login" element={<LoginController />} />
        <Route path="/signup" element={<SignUpController />} />
        <Route path="/newEvent" element={<NewEventController />} />
        <Route path="/:eventName" element={<EventController />} />
        <Route path="/:eventName/newPresentation" element={<NewPresentationController />} />
        <Route path="/:eventName/:presentationName" element={<PresentationController />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
