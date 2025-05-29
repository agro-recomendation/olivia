import { Link } from '@inertiajs/react';
import { LogOut, User, Lock, FileText, ClipboardList, ChevronLeft } from 'lucide-react';

export default function Sidebar({ active }) {
    return (
        <div className="w-72 bg-[#2B5400] font-livvic text-white min-h-screen px-6 py-8 flex flex-col justify-between">
            <div>
                {/* Logo dan Judul */}
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white">
                        <img src="/Images/logo-Agro.png" alt="Logo" className="w-10 h-10" />
                    </span>
                    <h1 className="text-3xl font-bold text-[#FFF264]">Profil</h1>
                </div>

                {/* Tombol Kembali ke Home */}
                <div className="mb-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#FFFFFF] font-semibold  transition"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Beranda
                    </Link>
                </div>

                {/* Menu Utama */}
                <div className="space-y-4">
                    {/* <h2 className="text-lg font-semibold">Akun</h2> */}
                    <nav className="space-y-2">
                        <Link
                            href="/profile"
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold ${
                                active === 'profile'
                                    ? 'bg-[#FFFA72]/20 text-[#FFFA72] [&_svg]:text-[#FFFA72]'
                                    : 'hover:bg-[#FFFA72]/10'
                            }`}
                        >
                            <User className="w-5 h-5" />
                            Profil Saya
                        </Link>
                        <Link
                            href={route('profile.password')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold ${
                                active === 'security'
                                    ? 'bg-[#A6B87E] text-[#FFFA72] [&_svg]:text-[#FFFA72]'
                                    : 'hover:bg-[#A6B87E]/40'
                            }`}
                        >
                            <Lock className="w-5 h-5" />
                            Keamanan
                        </Link>
                    </nav>

                    {/* Aktivitas */}
                    {/* <h2 className="mt-6 text-lg font-semibold">Aktivitas</h2> */}
                    <nav className="space-y-2">
                        <Link href="/riwayat-analisis" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#A6B87E]/40">
                            <FileText className="w-5 h-5" />
                            Riwayat Analisis
                        </Link>
                        <Link href="/riwayat-deteksi" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#A6B87E]/40">
                            <ClipboardList className="w-5 h-5" />
                            Riwayat Deteksi
                        </Link>
                    </nav>
                </div>
            </div>

            {/* Logout */}
            <Link
                href="/logout"
                method="post"
                as="button"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600/50"
            >
                <LogOut className="w-5 h-5" />
                Logout
            </Link>
        </div>
    );
}
