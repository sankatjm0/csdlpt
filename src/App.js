"use client"

import "./components/css/App.css"
import { EmployeeProvider } from "./contexts/EmployeeContext.js"
import EmployeeManager from "./components/EmployeeManager.js"

function App() {
  return (
      <EmployeeProvider>
        <EmployeeManager />
      </EmployeeProvider>
  )
}

export default App
