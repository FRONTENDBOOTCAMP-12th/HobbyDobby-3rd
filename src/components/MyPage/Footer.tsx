import Swal from 'sweetalert2';
import './styles/my-page-footer.css';
import { useNavigate } from 'react-router';
import { useUserStore } from '@/stores/user';
import { useUserAchievementStore } from '@/stores/user-achievement';

function MypageFooter() {
  const userId = useUserStore((user) => user.id);
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
          Swal.fire({
            title: '로그아웃 성공',
            icon: 'success',
            confirmButtonColor: `var(--primary-color)`,
            text: '랜딩페이지로 이동합니다.',
            heightAuto: false,
            scrollbarPadding: false,
          })
            .then(() => {
              logout();
              localStorage.removeItem('store/user');
              useUserAchievementStore.getState().resetAchievements();
              localStorage.removeItem('store/user-achievements');
              void navigate('/');
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleWithdraw = async () => {
    if (userId !== 'testbot12') {
      Swal.fire({
        text: '탈퇴 페이지로 이동합니다.',
        confirmButtonColor: `var(--primary-color)`,
        showCancelButton: true,
        heightAuto: false,
        scrollbarPadding: false,
      })
        .then((result) => {
          if (result.isConfirmed) {
            void navigate('/withdraw');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await Swal.fire({
        icon: 'warning',
        text: '테스트용 계정은 회원 탈퇴가 불가합니다.',
        scrollbarPadding: false,
      });
    }
  };

  return (
    <footer className="mypage-footer">
      <button type="button" onClick={handleLogout}>
        로그아웃
      </button>
      <span aria-hidden="true">|</span>
      <button type="button" onClick={() => void handleWithdraw()}>
        회원탈퇴
      </button>
    </footer>
  );
}

export default MypageFooter;
