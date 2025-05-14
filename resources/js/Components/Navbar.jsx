import React from 'react';
import { route } from 'ziggy-js';

export default function Navbar({ auth }) {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#355C00] text-white font-poppins">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gray-300 border-2 border-black" />
        <span className="font-bold text-lg">TaniCerdas</span>
      </div>

      {/* Navigasi */}
      <ul className="flex space-x-8 items-center font-semibold text-sm">
        <li className="relative">
          <a href="#" className="hover:underline">Beranda</a>
          <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#FFA800] block"></span>
        </li>
        <li><a href="#" className="hover:underline">Tentang kami</a></li>
        <li><a href="#" className="hover:underline">Kontak</a></li>
        <li><a href="#" className="text-[#FFA800] font-bold">#TanamAku</a></li>
      </ul>

      {/* Tombol Aksi */}
      <div className="flex space-x-3">
        {auth?.user ? (
          <a
            href={route('dashboard')}
            className="bg-[#FFC640] text-black px-4 py-1.5 rounded-md font-semibold hover:opacity-90 transition"
          >
            Dashboard
          </a>
        ) : (
          <>
            <a
              href={route('register')}
              className="border border-white text-white px-4 py-1.5 rounded-md hover:bg-white hover:text-[#355C00] transition"
            >
              Daftar
            </a>
            <a
              href={route('login')}
              className="bg-[#FFC640] text-black px-4 py-1.5 rounded-md font-semibold hover:opacity-90 transition"
            >
              Masuk
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
