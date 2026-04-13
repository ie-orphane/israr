<?php

use App\Http\Controllers\ProgrammeController;
use Illuminate\Support\Facades\Route;

Route::get('/programmes', [ProgrammeController::class, 'index'])->name('programmes');
Route::get('/programmes/{programme}', [ProgrammeController::class, 'show'])->name('programmes.show');
