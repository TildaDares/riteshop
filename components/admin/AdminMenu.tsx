import React from 'react'
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import { ListItemButton, ListItemIcon, List, ListItemText, ListSubheader, Divider } from '@mui/material';
import { useRouter } from 'next/router'

const AdminMenu = () => {
  const router = useRouter()
  const handleLink = (href: string) => {
    router.push(href)
  }

  return (
    <>
      <Divider />
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Admin
          </ListSubheader>
        }
      >
        <ListItemButton onClick={() => handleLink('/users/all')}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>

        <ListItemButton onClick={() => handleLink('/products/all')}>
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>

        <ListItemButton onClick={() => handleLink('/requests/all')}>
          <ListItemIcon>
            <UpcomingIcon />
          </ListItemIcon>
          <ListItemText primary="Requests" />
        </ListItemButton>
      </List>
    </>
  )
}

export default AdminMenu