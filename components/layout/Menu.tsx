import * as React from 'react';
import Logout from '@mui/icons-material/Logout';
import ProfileAvatar from '@/components/auth/ProfileAvatar'
import NextLink from 'next/link'
import { Divider, MenuItem, Menu, Avatar, Link, ListItemButton, ListItemIcon, Tooltip, IconButton, Typography } from '@mui/material';
import { postData } from '@/utils/fetchData'
import { mutate } from 'swr';
import { User } from '@/types/User';
import AdminMenu from '@/components/admin/AdminMenu';
import { autoLogout } from '@/utils/auth';

export default function AccountMenu({ user }: { user: User }) {
  const { role, name } = user
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    await postData('users/logout')
    autoLogout()
    mutate('users', null, false)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <ProfileAvatar name={name} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{ color: '#6c757d' }}>
          {name}
          {
            (role == 'admin' || role == 'salesagent') &&
            <Typography sx={{ pl: '3px' }}> - logged in as {role}</Typography>
          }
        </MenuItem>
        <MenuItem>
          <NextLink href='/profile' passHref>
            <Link underline="none" sx={{ display: 'flex' }}><Avatar /> Profile</Link>
          </NextLink>
        </MenuItem>
        <MenuItem>
          <NextLink href={'/orders'} passHref>
            <Link underline="none">
              Order History
            </Link>
          </NextLink>
        </MenuItem>
        <MenuItem>
          <NextLink href={'/requests'} passHref>
            <Link underline="none">
              My Requests
            </Link>
          </NextLink>
        </MenuItem>
        {role == 'admin' && <AdminMenu />}
        <Divider />
        <MenuItem sx={{ color: 'red' }}>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{ color: 'red' }}>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </ListItemButton>
        </MenuItem>
      </Menu>
    </>
  );
}
