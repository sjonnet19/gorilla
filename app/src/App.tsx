import { useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import DialogContentText from '@mui/material/DialogContentText'
import Students from './Students'
import Copyright from './Copyright'
import './App.css'
import AppTopBar from './AppTopBar'
import AppBottomBar from './AppBottomBar'
import AppSnackBar from './AppSnackBar'
import SideDrawer from './SideDrawer'
import AppBackdrop from './AppBackdrop'
import { DataGrid } from '@mui/x-data-grid/DataGrid'
import Classes from './Classes'

function App() {
  const [activeView, setActiveView] = useState('students')
  const [addModalOpen, setAddModalOpen] = useState('')
  
  const handleAddClick = () => {
    console.log('handleAddClick', activeView)
    setAddModalOpen(activeView)
  };

  return (
    <Container maxWidth={false} sx={{ padding: '0 !important' }}>
      <AppBackdrop />
      <AppSnackBar />
      <AppTopBar />
      <AppBottomBar showAdd={true} handleAddClick={handleAddClick} />
      <SideDrawer setActiveView={setActiveView} />
      <Box component="main" sx={{ flexGrow: 1, p: 4, my: 4 }}>
          { activeView === 'students' && <Students addModalOpen={addModalOpen} setAddModalOpen={setAddModalOpen} />}
          { activeView === 'classes' && <Classes addModalOpen={addModalOpen} setAddModalOpen={setAddModalOpen} />}
      </Box>
    </Container>
  )
}

export default App
