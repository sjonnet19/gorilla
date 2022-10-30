import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import Link from "@mui/material/Link"
import SvgIcon from "@mui/material/SvgIcon"
import Typography from "@mui/material/Typography/Typography"
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"
import { useEffect } from "react"

export default function Students(props: any) {
  const { addModalOpen, setAddModalOpen } = props;

  const handleModalClose = () => {
    setAddModalOpen('');
  }
  const handleSaveClick = () => {
    setAddModalOpen('');
  }

  const columns: GridColDef[] = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 90 
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150
    }
  ]
  
  let rows: any = []

  let rowCount = 0;


  useEffect(() => {
    fetch('/api/students')
      .then(res => res.json())
      .then(res => {
        console.log('res', res)
        rows = res
        rowCount = rows.length
      })
  }, [])

  return (
    <Container maxWidth={false} style={{}}>
      <Typography variant="h4" component="div" sx={{ flexGrow: 1, p: 2 }}>
          Students
      </Typography>
      <div style={{ width: '100%' }}>
        <DataGrid
            autoHeight
            autoPageSize
            rows={rows}
            rowCount={rowCount}
            columns={columns}
            getRowId={(row) => row.ID}
            components={{ Toolbar: GridToolbar }}
            paginationMode="server"
            sx={{
                '& .MuiDataGrid-cell:focus': {
                    outline: 0
                }
            }}
        />
      </div>

      <Dialog
          open={addModalOpen === 'students'}
          onClose={handleModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
          <DialogTitle id="alert-dialog-title">Add Student</DialogTitle>
          <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <TextField
                  label="Name"
                  variant="filled"
                />
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={handleModalClose}>Cancel</Button>
              <Button onClick={handleSaveClick}>
                  Save
              </Button>
          </DialogActions>
      </Dialog>
    </Container>
  )
}
