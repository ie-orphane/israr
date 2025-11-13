<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;



Route::get('/contact', [ContactController::class, 'index']);

