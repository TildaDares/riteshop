import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import {
  Badge,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import { useRouter } from 'next/router';
import useCart from '@/hooks/cart/useCart';
import Loader from '@/components/layout/Loader';

const MobileBottomNavigation = () => {
  const router = useRouter()
  const { cart, loading } = useCart();

  function onLink(href: string) {
    router.push(href)
  }

  if (loading) return <Loader />

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: 'block', sm: 'none' },
        backgroundColor: '#0d0c22',
        zIndex: 2000
      }}>
      <BottomNavigation
        showLabels
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={() => onLink('/')} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} onClick={() => onLink('/search')} />
        <BottomNavigationAction label="Cart" icon={
          <Badge badgeContent={cart ? cart.items.length : 0} color="primary">
            <ShoppingCartIcon />
          </Badge>
        } onClick={() => onLink('/cart')} />
      </BottomNavigation>
    </Paper>
  );
}

export default MobileBottomNavigation
