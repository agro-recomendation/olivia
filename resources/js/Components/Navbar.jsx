import React, { useState, useEffect, useRef } from 'react';
import { route } from 'ziggy-js';
import { Inertia } from '@inertiajs/inertia';

export default function Navbar({ auth }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef();

  function handleLogout() {
    Inertia.post(route('logout'), {}, {
      onSuccess: () => {
        Inertia.visit(route('beranda'));
      },
    });
  }

  // Tutup dropdown profil jika klik di luar elemen
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#355C00] text-white font-poppins relative z-50">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img src="/Images/logo-Agro.png" alt="Logo Agro" className="w-12 h-12 object-contain border-2 bg-white rounded-full" />
        <span className="font-bold text-lg">TaniCerdas</span>
      </div>

      {/* Navigasi */}
      <ul className="flex space-x-8 items-center font-semibold text-sm">
        <li className="relative">
          <a href="#" className="hover:underline">Beranda</a>
          <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#FFFA72] block"></span>
        </li>
        <li>
          <button onClick={() => document.getElementById('tentang-kami')?.scrollIntoView({ behavior: 'smooth' })}>
            Tentang Kami
          </button>
        </li>
        <li>
          <button onClick={() => document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' })}>
            Kontak
          </button>
        </li>
        <li className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-[#FFFA72] font-bold flex items-center gap-1"
          >
            #TanamAku
            <svg
              className={`w-3 h-3 transform transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.355a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <ul className="absolute font-poppins left-0 mt-2 w-64 bg-white text-black rounded-md shadow-lg z-10">
              <li>
                <a href="/analisis-potensi-tanaman" className="block px-4 py-2 hover:bg-gray-100 border-b" style={{ borderColor: '#FFFA72' }}>
                  Analisis potensi tanaman
                </a>
              </li>
              <li>
                <a href="/deteksi-penyakit-tanaman" className="block px-4 py-2 hover:bg-gray-100 border-b" style={{ borderColor: '#FFFA72' }}>
                  Deteksi penyakit tanaman
                </a>
              </li>
              <li>
                <a href="#prediksi" className="block px-4 py-2 hover:bg-gray-100">
                  Prediksi musim tanam & panen
                </a>
              </li>
            </ul>
          )}
        </li>
      </ul>

      {/* Profil / Auth Aksi */}
      <div className="relative" ref={profileRef}>
        {auth?.user ? (
          <div>
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-none"
            >
              <img
                src={auth.user.photo || '/Images/profile.jpg'}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-xl text-center py-5 z-20">
                <img
                  src={auth.user.photo || '/Images/profile.jpg'}
                  alt="User"
                  className="w-16 h-16 rounded-full object-cover mx-auto"
                />
                <p className="text-[#355C00] font-semibold text-lg mt-2">{auth.user.name}</p>
                <button
                  onClick={handleLogout}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Keluar
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex space-x-3">
            <a
              href={route('register')}
              className="border border-white text-white px-4 py-1.5 rounded-md hover:bg-white hover:text-[#FFFA72] transition"
            >
              Daftar
            </a>
            <a
              href={route('login')}
              className="bg-[#FFFA72] text-black px-4 py-1.5 rounded-md font-semibold hover:opacity-90 transition"
            >
              Masuk
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
