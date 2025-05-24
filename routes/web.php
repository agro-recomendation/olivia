<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


    Route::get('/analisis-potensi-tanaman', function () {
        return Inertia::render('Analisys'); 
    })->middleware(['auth', 'verified'])->name('analisis.potensi');

    Route::get('/analisis-penyakit-tanaman', function () {
        return Inertia::render('DeteksiPenyakitTanaman'); 
    })->middleware(['auth', 'verified'])->name('analisis.penyakit');

    Route::post('/hasil-analisis', function (Request $request) {
    return Inertia::render('AnalysisDisease', [
        'alamat' => $request->input('alamat'),
        'fileUrl' => $request->file('file') ? $request->file('file')->store('uploads', 'public') : null,
    ]);
    });

    Route::get('/prediksi-musim-tanam', function () {
        return Inertia::render('PrediksiPanen'); 
    })->middleware(['auth', 'verified'])->name('deteksi.panen');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
