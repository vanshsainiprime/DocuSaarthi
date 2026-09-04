import Profile from './pages/Profile'
import Navigation from './components/Navigation'
import {
  Routes,
  Route,
} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import ServiceDetails from './pages/ServiceDetails'
import Requirements from './pages/Requirements'
import BankAccountRequirements from './pages/BankAccountRequirements'
import PanCardRequirements from './pages/PanCardRequirements'
import MyDocuments from './pages/MyDocuments'
import FormAssistant from './pages/FormAssistant'
import ChandigarhForms from './pages/ChandigarhForms'
import Services from './pages/Services'
import Forms from './pages/Forms'
import DelhiForms from './pages/DelhiForms'
import DocumentDictionary from './pages/DocumentDictionary'
import Settings from './pages/Settings'
import EditProfile from './pages/EditProfile'
import ChangePassword from './pages/ChangePassword'
import SharedDocuments from './pages/SharedDocuments'
import ActiveShareLinks from './pages/ActiveShareLinks'
import CreateAccount from './pages/CreateAccount'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import AIAssistant from './components/AIAssistant'
import { useState } from 'react'
import Notifications from './pages/Notifications'
import GenericRequirements from './pages/GenericRequirements'
import ChandigarhServices from './pages/ChandigarhServices'

function App() {
  const [aiOpen, setAiOpen] = useState(false)
  return (
    <>
      <Header />

      <Navigation />

      <Routes>
        <Route
          path="/services/chandigarh"
          element={<ChandigarhServices />}
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/ai-assistant"
          element={
            <AIAssistant
              isOpen={aiOpen}
              onClose={() => setAiOpen(false)}
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/create-account"
          element={<CreateAccount />}
        />

        <Route
          path="/settings/share-links"
          element={<ActiveShareLinks />}
        />

        <Route
          path="/share/:token"
          element={<SharedDocuments />}
        />

        <Route
          path="/settings/change-password"
          element={<ChangePassword />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/settings/profile"
          element={<EditProfile />}
        />

        <Route
          path="/document-dictionary"
          element={<DocumentDictionary />}
        />

        <Route
          path="/forms/delhi"
          element={<DelhiForms />}
        />

        <Route
          path="/forms"
          element={<Forms />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/forms/chandigarh"
          element={<ChandigarhForms />}
        />

        <Route
          path="/form-assistant"
          element={<FormAssistant />}
        />

        <Route
          path="/documents"
          element={<MyDocuments />}
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Home */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* OBC Certificate */}

        <Route
          path="/services/obc-certificate"
          element={<ServiceDetails />}
        />

        <Route
          path="/services/obc-certificate/requirements"
          element={<Requirements />}
        />

        {/* Bank Account */}

        <Route
          path="/services/bank-account/requirements"
          element={<BankAccountRequirements />}
        />

        {/* PAN Card */}

        <Route
          path="/services/pan-card/requirements"
          element={<PanCardRequirements />}
        />

      
      {/* Generic Services */}
      <Route
        path="/services/aadhaar/requirements"
        element={<GenericRequirements />}
      />
      
      <Route
        path="/services/voter-id/requirements"
        element={<GenericRequirements />}
      />
      
      <Route
        path="/services/passport/requirements"
        element={<GenericRequirements />}
      />
      
      <Route
        path="/services/driving-licence/requirements"
        element={<GenericRequirements />}
      />
      
      <Route
        path="/services/vehicle-registration/requirements"
        element={<GenericRequirements />}
      />
      
      <Route
        path="/services/income-certificate/requirements"
        element={<GenericRequirements />}
      />
      
      <Route
        path="/services/caste-certificate/requirements"
        element={<GenericRequirements />}
      />
      
      <Route
        path="/services/domicile-certificate/requirements"
        element={<GenericRequirements />}
      />
      
      <Route
        path="/services/birth-certificate/requirements"
        element={<GenericRequirements />}
      />
      
      <Route
        path="/services/death-certificate/requirements"
        element={<GenericRequirements />}
      />
      
      <Route
        path="/services/marriage-certificate/requirements"
        element={<GenericRequirements />}
      />
      
      <Route
        path="/services/land-property/requirements"
        element={<GenericRequirements />}
      />
      
      <Route
        path="/services/scholarship/requirements"
        element={<GenericRequirements />}
      />
      
      <Route
        path="/services/government-schemes/requirements"
        element={<GenericRequirements />}
      />
      
      <Route
        path="/services/residence-certificate/requirements"
        element={<GenericRequirements />}
      />
      </Routes>


      {/* GLOBAL AI BUTTON */}

      {!aiOpen && (
              <button
                type="button"
                className="floating-ai-button"
                aria-label="Open AI Assistant"
                onClick={() => setAiOpen(true)}
              >
                <img
                  src="/images/ai-button.png"
                  alt="AI Assistant"
                  style={{
                    width: '70px',
                    height: '70px',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </button>
            )}
      
            <AIAssistant
              isOpen={aiOpen}
              onClose={() => setAiOpen(false)}
            />
  
    </>
  )
}

export default App