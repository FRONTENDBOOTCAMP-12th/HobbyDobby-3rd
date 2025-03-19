import Swal from 'sweetalert2';
import './styles/my-page-footer.css';
import { useNavigate } from 'react-router';
import { useUserStore } from '@/stores/user';

function MypageFooter() {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    Swal.fire({
      text: '로그아웃 하시겠습니까?',
      icon: 'question',
      confirmButtonColor: `var(--primary-color)`,
      showCancelButton: true,
      heightAuto: false,
    })
      .then((result) => {
        if (result.isConfirmed) {
          logout();
          localStorage.removeItem('store/user');
          void navigate('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleWithdraw = () => {
    Swal.fire({
      text: '탈퇴 페이지로 이동합니다.',
      confirmButtonColor: `var(--primary-color)`,
      showCancelButton: true,
      heightAuto: false,
    })
      .then((result) => {
        if (result.isConfirmed) {
          void navigate('/withdraw');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <footer className="mypage-footer">
      <button type="button" onClick={handleLogout}>
        로그아웃
      </button>
      <span aria-hidden="true">|</span>
      <button type="button" onClick={handleWithdraw}>
        회원탈퇴
      </button>
    </footer>
  );
}

export default MypageFooter;
