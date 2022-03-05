import {useLocation, NavLink, Outlet} from 'react-router-dom';
import { getPrescriptions } from '../data';

function QueryNavLink({ to, ...props } : { to: string; children: string; key: number;}): JSX.Element {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

function Queue(): JSX.Element {
  let invoices = getPrescriptions();

  return (
    <>
      <nav className="sidebar">
        {invoices
          .map((prescription) => (
            <QueryNavLink
              key={prescription.number}
              to={`/${prescription.number}`}
            >
              {prescription.name}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </>
  );
}

export default Queue