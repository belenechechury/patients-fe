import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PatientsDashboard from '@/features/patients/PatientsDashboard'
import RootLayout from '@/layouts/RootLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route
            path="/"
            element={<PatientsDashboard />}
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
