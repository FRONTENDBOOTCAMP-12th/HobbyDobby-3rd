import BottomNavbar from '@/components/BottomNavbar';
import TopNavbar from '@/components/TopNavbar';
import { Outlet } from 'react-router';

const MIN_HEIGHT = '1000px';

function MainLayout() {
  return (
    <>
      <TopNavbar />
      <div
        style={{
          width: '100%',
          minHeight: `${MIN_HEIGHT}`,
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
