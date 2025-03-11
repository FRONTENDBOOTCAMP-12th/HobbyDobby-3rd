import BottomNavbar from '@/components/BottomNavbar';
import TopNavbar from '@/components/TopNavbar';
import { Outlet } from 'react-router';

function MainLayout() {
  return (
    <>
      <TopNavbar />
      <div
        style={{
          width: '100%',
          paddingTop: '4rem',
          paddingBottom: '4.5rem',
          boxSizing: 'border-box',
        }}
      >
        <Outlet />
      </div>
      <BottomNavbar />
    </>
  );
}

export default MainLayout;
