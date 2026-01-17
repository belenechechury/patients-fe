import type { IPatient } from '@/features/patients/types'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PatientsDashboard from '@/features/patients/PatientsDashboard';

// Mock data
export const mockPatients: IPatient[] = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
    phone: "+1 555 123 456",
    idImg: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@example.com",
    phone: "+1 555 987 654",
    idImg: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3,
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.brown@example.com",
    phone: "+1 555 246 810",
    idImg: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id: 4,
    firstName: "Diana",
    lastName: "Prince",
    email: "diana.prince@example.com",
    phone: "+1 555 369 258",
    idImg: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    id: 5,
    firstName: "Ethan",
    lastName: "Hunt",
    email: "ethan.hunt@example.com",
    phone: "+1 555 741 852",
    idImg: "https://randomuser.me/api/portraits/men/5.jpg"
  }
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<PatientsDashboard patients={mockPatients} />} />

        {/* Cualquier otra ruta redirige a dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
