import './style.css';
import HobbyCard from '@/components/TopNavbar';
import StoreItem from '@/components/StoreItem/storeitem';
import BottomNavbar from '@/components/BottomNavbar';

function StorePage() {
  return (
    <main className="storepage">
      <h1 className="sr-only">Hobby Dobby</h1>
      <HobbyCard />
      <StoreItem />
      <BottomNavbar />
    </main>
  );
}

export default StorePage;
