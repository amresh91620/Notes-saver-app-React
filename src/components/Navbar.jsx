import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
<nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex justify-between items-center h-16">
      
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-r from-indigo-500 to-purple-600 
                        rounded-xl flex items-center justify-center shadow-md">
          <span className="text-white font-extrabold text-lg">P</span>
        </div>
        <h1 className="text-xl font-extrabold tracking-wide">
          Paste<span className="text-indigo-600">App</span>
        </h1>
      </div>

      <div className="flex gap-3">
        {[
          { name: 'Home', path: '/' },
          { name: 'Pastes', path: '/pastes' },
        ].map(link => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `px-5 py-2 rounded-full font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </div>
  </div>
</nav>

  )
}

export default Navbar