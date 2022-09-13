import React, { cloneElement, useState } from 'react';
import NextLink from 'next/link'
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Badge,
  Link,
  Grid,
  Stack,
  useScrollTrigger
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from '@/components/SearchBar'
import { ElevationProps } from '@/types/Layout'
import Menu from '@/components/layout/Menu'
import useCart from '@/hooks/cart/useCart';
import useUser from '@/hooks/user/useUser'

const ElevationScroll = (props: ElevationProps) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function NavBar() {
  const { user } = useUser()
  const { cart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <ElevationScroll>
        <AppBar
          component="nav"
          sx={{
            mb: 2,
            backgroundColor: '#fff',
            px: { sm: 4 }
          }}
        >
          <Toolbar>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <NextLink href='/' passHref>
              <Link sx={{
                flexGrow: 1,
              }}
                underline="none"
              >
                <Typography
                  sx={{
                    fontSize: '1.5rem',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                  }}
                >
                  Riteshop
                </Typography>
              </Link>
            </NextLink>
            <Stack direction="row" spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
              <Grid sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: '20px' }}>
                <SearchBar />
                <NextLink href='/cart' passHref>
                  <Link underline="none">
                    <Badge badgeContent={cart ? cart.items.length : 0} color="primary">
                      <ShoppingCartIcon fontSize="large" />
                    </Badge>
                  </Link>
                </NextLink>
              </Grid>
              {user ?
                (<Menu user={user} />) :
                (<Button size="large">
                  <NextLink href='/login' passHref>
                    <Link underline="none">Login</Link>
                  </NextLink>
                </Button>)
              }
            </Stack>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </Box>
  );
}
