/*
import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const columns = [
  { field: 'id', headerName: 'Request ID', width: 150 },
  { field: 'userId', headerName: 'User ID', width: 150 },
  { field: 'fullName', headerName: 'Full Name', width: 200 },
  { field: 'userType', headerName: 'User Type', width: 150 },
  { field: 'requestTitle', headerName: 'Request Title', width: 300 },
  { field: 'dateSubmitted', headerName: 'Date Submitted', width: 200 },
  { field: 'status', headerName: 'Status', width: 150 },
];

const initialRows = [
    { id: 'TR01', userId: 'A102', fullName: 'Hedwig F. Nguyen', userType: 'Franchisor', requestTitle: 'Cannot update profile info', dateSubmitted: '12-Oct-2024', status: 'Pending' },
    { id: 'TR02', userId: 'A102', fullName: 'Hedwig F. Nguyen', userType: 'Franchisor', requestTitle: 'Issue with report export', dateSubmitted: '12-Oct-2024', status: 'Pending' },
    { id: 'TR01', userId: 'A102', fullName: 'Hedwig F. Nguyen', userType: 'Franchisor', requestTitle: 'Cannot update profile info', dateSubmitted: '12-Oct-2024', status: 'Pending' },
  { id: 'TR02', userId: 'A102', fullName: 'Hedwig F. Nguyen', userType: 'Franchisor', requestTitle: 'Issue with report export', dateSubmitted: '12-Oct-2024', status: 'Pending' },
  { id: 'TR01', userId: 'A102', fullName: 'Hedwig F. Nguyen', userType: 'Franchisor', requestTitle: 'Cannot update profile info', dateSubmitted: '12-Oct-2024', status: 'Pending' },
    { id: 'TR02', userId: 'A102', fullName: 'Hedwig F. Nguyen', userType: 'Franchisor', requestTitle: 'Issue with report export', dateSubmitted: '12-Oct-2024', status: 'Pending' },
    { id: 'TR01', userId: 'A102', fullName: 'Hedwig F. Nguyen', userType: 'Franchisor', requestTitle: 'Cannot update profile info', dateSubmitted: '12-Oct-2024', status: 'Pending' },
  { id: 'TR02', userId: 'A102', fullName: 'Hedwig F. Nguyen', userType: 'Franchisor', requestTitle: 'Issue with report export', dateSubmitted: '12-Oct-2024', status: 'Pending' },
  // Add more rows as needed
];

const CustomToolbar = () => (
  <GridToolbarContainer sx={{ justifyContent: 'flex-end' }}>
    <GridToolbarExport />
    <Button variant="outlined" color="primary" sx={{ ml: 2 }}>Filter</Button>
  </GridToolbarContainer>
);

export default function Dashboard() {
  const [rows, setRows] = useState(initialRows);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    id: '',
    userId: '',
    fullName: '',
    userType: '',
    requestTitle: '',
    dateSubmitted: '',
    status: '',
  });
  const [selectedMonth, setSelectedMonth] = useState('January');

  const handleFilterButtonClick = () => {
    setIsFilterDialogOpen(true);
  };

  const handleFilterDialogClose = () => {
    setIsFilterDialogOpen(false);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterValues({ ...filterValues, [name]: value });
  };

  const handleFilterSubmit = () => {
    const filteredRows = initialRows.filter((row) => {
      return Object.keys(filterValues).every((key) => {
        return row[key].toString().toLowerCase().includes(filterValues[key].toLowerCase());
      });
    });
    setRows(filteredRows);
    setIsFilterDialogOpen(false);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          Technical Requests
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="month-select-label">Month</InputLabel>
          <Select
            labelId="month-select-label"
            id="month-select"
            value={selectedMonth}
            label="Month"
            onChange={handleMonthChange}
          >
            <MenuItem value="January">January</MenuItem>
            <MenuItem value="February">February</MenuItem>
            <MenuItem value="March">March</MenuItem>
            <MenuItem value="April">April</MenuItem>
            <MenuItem value="May">May</MenuItem>
            <MenuItem value="June">June</MenuItem>
            <MenuItem value="July">July</MenuItem>
            <MenuItem value="August">August</MenuItem>
            <MenuItem value="September">September</MenuItem>
            <MenuItem value="October">October</MenuItem>
            <MenuItem value="November">November</MenuItem>
            <MenuItem value="December">December</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={4}>
          <Item>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h4">20</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Typography variant="h6">Pending</Typography>
            <Typography variant="h4">19</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Typography variant="h6">Resolved</Typography>
            <Typography variant="h4">01</Typography>
          </Item>
        </Grid>
      </Grid>
      <Box sx={{ mb: 2 }}>
        <Stack direction="row" spacing={150}>
          <TextField variant="outlined" placeholder="Search" fullWidth />
          <Button variant="outlined" color="primary" onClick={handleFilterButtonClick}>
            Filter
          </Button>
        </Stack>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          components={{ Toolbar: CustomToolbar }}
        />
      </div>
      <Dialog open={isFilterDialogOpen} onClose={handleFilterDialogClose}>
        <DialogTitle>Filter</DialogTitle>
        <DialogContent>
          {Object.keys(filterValues).map((key) => (
            <TextField
              key={key}
              margin="dense"
              name={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              fullWidth
              variant="outlined"
              value={filterValues[key]}
              onChange={handleFilterChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFilterDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFilterSubmit} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
*/
import { Link } from "react-router-dom";
import { useState } from "react";
import ManageUser from "./ManageUser";
import { IconButton, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ManageUserPage=() => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => { 
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", { firstName, lastName, email, password });
  };

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setEditForm(true);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteDialog(true);
    handleMenuClose();
  };

  const handleResetClick = () => {
    setResetForm(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    // Handle delete logic here
    console.log("User deleted:", selectedUser);
    setDeleteDialog(false);
  };

  return (
    <>
      <div
        className={
          visibleForm ? "fixed inset-0 h-full w-full bg-[#1b1b1b4d]" : "hidden"
        }
      >
        <div className="fixed z-90 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold mb-4">Add Franchisor</h2>
              <Link to="/">
                <h2
                  onClick={() => setVisibleForm(false)}
                  className="cursor-pointer font-bold mb-3"
                >
                  X
                </h2>
              </Link>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className=" text-gray-700 font-bold mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                  placeholder="Enter First Name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className=" text-gray-700 font-bold mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                  placeholder="Enter Last Name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                  placeholder="Enter Email"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Create Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                  placeholder="Create a password for the user"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setVisibleForm(false)}
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className={
          editForm ? "fixed inset-0 h-full w-full bg-[#1b1b1b4d]" : "hidden"
        }
      >
        <div className="fixed z-90 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold mb-4">Edit User</h2>
              <h2
                onClick={() => setEditForm(false)}
                className="cursor-pointer font-bold mb-3"
              >
                X
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="editFirstName"
                  className=" text-gray-700 font-bold mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="editFirstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                  placeholder="Enter First Name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="editLastName"
                  className=" text-gray-700 font-bold mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="editLastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                  placeholder="Enter Last Name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="editEmail"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="editEmail"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                  placeholder="Enter Email"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setEditForm(false)}
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className={
          resetForm ? "fixed inset-0 h-full w-full bg-[#1b1b1b4d]" : "hidden"
        }
      >
        <div className="fixed z-90 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold mb-4">Reset Password</h2>
              <h2
                onClick={() => setResetForm(false)}
                className="cursor-pointer font-bold mb-3"
              >
                X
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="resetPassword"
                  className="block text-gray-700 font-bold mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="resetPassword"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                  placeholder="Enter New Password"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setResetForm(false)}
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete {selectedUser?.fullName}?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>

      <main className="bg-[#FAFBFA] min-h-screen ">
        <div className="container w-[calc(100%-200px)] ml-auto mt-[70px] px-4 ">
          <ManageUser onMenuClick={handleMenuClick} />
        </div>
      </main>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={handleResetClick}>Reset Password</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default ManageUserPage;
