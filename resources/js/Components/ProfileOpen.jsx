import { Settings, LogOut } from 'lucide-react';
import { Inertia } from '@inertiajs/inertia';

export default function ProfileOpen({ auth, handleLogout, onProfile }) {
    return (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl text-left z-20 py-4 px-5 font-poppins">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#355C00] flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118A7.5 7.5 0 0112 15.75a7.5 7.5 0 017.499 4.368" />
                    </svg>
                </div>
                <div>
                    <p className="text-[#355C00] font-semibold text-lg">{auth.user.name}</p>
                    <p className="text-sm text-gray-500">{auth.user.email}</p>
                </div>
                <div className="ml-auto text-[#355C00]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
            <div className="border-t my-4 border-[#355C00]" />
            <button
                className="flex items-center gap-2 text-[#355C00] px-2 py-2 hover:bg-gray-100 w-full text-left text-sm font-medium"
                onClick={onProfile ? onProfile : () => Inertia.visit('/profile')}
            >
                <Settings className="w-5 h-5" />
                Pengaturan akun
            </button>
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 mt-2 px-2 py-2 hover:bg-gray-100 w-full text-left text-sm font-medium"
            >
                <LogOut className="w-5 h-5" />
                Keluar
            </button>
        </div>
    );
}