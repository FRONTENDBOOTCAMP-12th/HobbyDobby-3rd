import './style.css';
import StoreItem from '@/components/StoreItem';

function StorePage() {
  return (
    <main className="store-page">
      <h1 className="sr-only">Hobby Dobby</h1>
      <StoreItem />
    </main>
  );
}

export default StorePage;
