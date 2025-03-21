import './style.css';
import HobbyCard from '@/components/TopNavbar';
import StoreItem from '@/components/StoreItem';
import BottomNavbar from '@/components/BottomNavbar';

function StorePage() {
  return (
    <main className="store-page">
      <h1 className="sr-only">Hobby Dobby</h1>
      <HobbyCard />
      <StoreItem />
      <BottomNavbar />
    </main>
  );
}

export default StorePage;
