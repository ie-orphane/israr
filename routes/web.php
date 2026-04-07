<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PublicationController;
use App\Models\AideRequest;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/a-propos', [AboutController::class, 'index'])->name('about');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::get('/publications', [PublicationController::class, 'index'])->name('publications');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('dashboard/aide-requests', function () {
        $aideRequests = AideRequest::query()
            ->latest()
            ->limit(30)
            ->get([
                'id',
                'name',
                'region',
                'type_of_violence',
                'contact_method',
                'status',
                'created_at',
            ])
            ->map(fn (AideRequest $request) => [
                'id' => $request->id,
                'name' => $request->name,
                'region' => $request->region,
                'type_of_violence' => $request->type_of_violence,
                'contact_method' => $request->contact_method,
                'status' => $request->status,
                'created_at' => $request->created_at?->toIso8601String(),
            ]);

        return Inertia::render('aide/responses', [
            'aideRequests' => $aideRequests,
        ]);
    })->name('dashboard.aide-requests');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/programmes.php';
require __DIR__ . '/contact.php';
require __DIR__ . '/aide.php';
require __DIR__ . '/auth.php';
