import { NavLink as RR_NavLink, type To } from 'react-router';

interface TabLinkProps {
  to: To;
  name: string;
}

function TabLink({ to, name }: TabLinkProps) {
  return (
    <RR_NavLink
      to={to}
      style={({ isActive }) => ({
        color: isActive ? 'var(--text-green)' : '',
        borderBottom: isActive ? '3px solid var(--text-green)' : '',
      })}
    >
      {name}
    </RR_NavLink>
  );
}

export default TabLink;
