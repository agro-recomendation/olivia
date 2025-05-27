// resources/js/Pages/Profile/Edit.jsx

import Sidebar from '@/Components/Sidebar';
import ProfileCard from '@/Components/ProfileCard';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ auth }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <>
            <Head title="Ubah Profil" />
            <div className="flex min-h-screen bg-[#F7FFE5]">
                {/* Sidebar */}
                <Sidebar active="profile" />

                {/* Konten Utama */}
                <main className="flex-1 p-10">
                    <div className="max-w-4xl mx-auto space-y-10">
                        {/* Judul Halaman */}
                        <h1 className="text-3xl font-livvic font-bold text-[#2B5400]">Edit Profil</h1>

                        {/* Kartu Profil */}
                        <ProfileCard
                            title="Data Profil"
                            image="/Profile.png"
                        >
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label className="block mb-1 font-medium">Nama</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full p-3 font-poppins rounded-lg border border-gray-300 text-black"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full p-3 font-poppins rounded-lg border border-gray-300 text-black"
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div className="text-right">
                                    <button
                                        type="submit"
                                        className="bg-[#FFF264] text-[#2B5400] font-bold py-2 px-6 rounded-lg shadow hover:bg-yellow-300 transition"
                                        disabled={processing}
                                    >
                                        Ubah
                                    </button>
                                </div>
                            </form>
                        </ProfileCard>
                    </div>
                </main>
            </div>
        </>
    );
}
