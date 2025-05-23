import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Login" />

            <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 font-poppins">
                <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-lg overflow-hidden shadow-lg min-h-[500px]">

                    {/* Bagian Form Login */}
                    <div className="w-full md:w-1/2 p-10 flex flex-col justify-center min-w-[350px]">
                        <h1 className="text-4xl font-livvic font-bold mb-2">Masuk</h1>
                        <p className="text-gray-600 mb-6 text-base">
                            Silakan login untuk melanjutkan ke akun Anda
                        </p>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Masukkan email"
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
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Masukkan password"
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <label className="flex items-center text-sm text-gray-600">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="ml-2">Ingat saya</span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        Lupa password?
                                    </Link>
                                )}
                            </div>

                            <PrimaryButton
                                className="w-full flex justify-center items-center bg-[#325700] hover:bg-[#2a4a00] text-white py-2 rounded"
                                disabled={processing}
                            >
                                MASUK
                            </PrimaryButton>

                        </form>

                        <p className="text-sm text-center mt-6 text-gray-600">
                            Belum punya akun?{' '}
                            <Link href={route('register')} className="text-blue-600 hover:underline">
                                Daftar sekarang
                            </Link>
                        </p>
                    </div>

                    {/* Bagian Gambar */}
                    <div className="hidden md:block md:w-1/2 max-h-full">
                        <img
                            src="/images/image-login.png"
                            alt="Sawit"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
