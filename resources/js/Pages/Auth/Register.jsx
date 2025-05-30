import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />

            <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 font-poppins">
                <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-lg overflow-hidden shadow-lg min-h-[550px]">

                    {/* Form Register */}
                    <div className="w-full md:w-1/2 p-10 flex flex-col justify-center min-w-[350px]">
                        <h1 className="text-4xl font-livvic font-bold mb-2">Daftar</h1>
                        <p className="text-gray-600 mb-6 text-base">
                            Silakan daftar untuk membuat akun baru
                        </p>

                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <InputLabel htmlFor="name" value="Nama" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Masukkan nama"
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Masukkan email"
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="password" value="Password" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Masukkan password"
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="Ulangi password"
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <PrimaryButton
                                className="w-full flex justify-center items-center bg-[#325700] hover:bg-[#2a4a00] text-white py-2 rounded"
                                disabled={processing}
                            >
                                DAFTAR
                            </PrimaryButton>
                        </form>

                        <p className="text-sm text-center mt-6 text-gray-600">
                            Sudah punya akun?{' '}
                            <Link href={route('login')} className="text-blue-600 hover:underline">
                                Masuk sekarang
                            </Link>
                        </p>
                    </div>

                    {/* Gambar */}
                    <div className="hidden md:block md:w-1/2 max-h-full">
                        <img
                            src="/images/register-image.png"
                            alt="Sawit"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
