import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'lucide-react';
const logo = 'https://images.unsplash.com/photo-1584555114411-9b3f5d5f8e4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';

function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4">
      <Link to="/">
        <img src={logo} alt="FocalPoint Logo" className="w-12 h-12" />
      </Link>
      <ul className="flex items-center space-x-4">
        <li>
          <Link to="/testimonials">
            <Icon name="Quote" className="text-lg" />
            Testimonials
          </Link>
        </li>
        <li>
          <Link to="/portfolio">
            <Icon name="Briefcase" className="text-lg" />
            Portfolio
          </Link>
        </li>
        <li>
          <Link to="/contact">
            <Icon name="Mail" className="text-lg" />
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;