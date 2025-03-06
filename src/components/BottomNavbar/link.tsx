import { NavLink as RR_NavLink, type To } from 'react-router';

interface NavLinkProps {
  to: To;
  image: string;
  menu: string;
}

function Navlink({ to, image, menu }: NavLinkProps) {
  return (
    <RR_NavLink
      to={to}
      className="navlink"
      style={({ isActive }) => ({
        borderTop: isActive ? '3px solid var(--text-green)' : '',
      })}
    >
      <div className="navlink__content">
        <img src={image} alt={menu} title={menu} className="navlink__image" />
      </div>
    </RR_NavLink>
  );
}

export default Navlink;
