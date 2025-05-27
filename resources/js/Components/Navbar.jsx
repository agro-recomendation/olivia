import React, { useState } from 'react';
import { route } from 'ziggy-js';
import { Inertia } from '@inertiajs/inertia'; // kalau kamu pakai InertiaJS

export default function Navbar({ auth }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fungsi logout
  function handleLogout() {
    // Ini contoh logout dengan Inertia (sesuaikan kalau pakai metode lain)
    Inertia.post(route('logout'), {}, {
      onSuccess: () => {
        // Setelah logout sukses, redirect ke halaman beranda
        Inertia.visit(route('beranda')); 
      },
    });
  }

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
                <a 
                  href="/analisis-potensi-tanaman" 
                  className="block px-4 py-2 hover:bg-gray-100 border-b"
                  style={{ borderColor: '#FFFA72' }}
                >
                  Analisis potensi tanaman
                </a>
              </li>
              <li>
                <a 
                  href="/deteksi-penyakit-tanaman" 
                  className="block px-4 py-2 hover:bg-gray-100 border-b"
                  style={{ borderColor: '#FFFA72' }}
                >
                  Deteksi penyakit tanaman
                </a>
              </li>
              <li>
                <a 
                  href="#prediksi" 
                  className="block px-4 py-2 hover:bg-gray-100"
                  // Tidak perlu border bawah di item terakhir
                >
                  Prediksi musim tanam & panen
                </a>
              </li>
            </ul>

          )}
        </li>
      </ul>

      {/* Tombol Aksi */}
      <div className="flex space-x-3">
        {auth?.user ? (
          <button
            onClick={handleLogout}
            className="bg-[#FFFA72] text-black px-4 py-1.5 rounded-md font-semibold hover:opacity-90 transition"
          >
            Keluar
          </button>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
}
