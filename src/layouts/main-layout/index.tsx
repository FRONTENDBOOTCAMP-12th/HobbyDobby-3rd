import BottomNavbar from '@/components/BottomNavbar';
import TopNavbar from '@/components/TopNavbar';
import { useMemo } from 'react';
import { Outlet } from 'react-router';

const MIN_HEIGHT = '785px';

function MainLayout() {
  const topNavbar = useMemo(() => <TopNavbar />, []);
  const bottomNavbar = useMemo(() => <BottomNavbar />, []);

  return (
    <>
      {topNavbar}
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
      {bottomNavbar}
    </>
  );
}

export default MainLayout;
