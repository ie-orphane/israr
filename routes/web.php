<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\AboutDocumentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\ProgrammeController;
use App\Models\AideRequest;
use App\Models\Contact;
use App\Models\Partner;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $partners = Partner::query()
        ->active()
        ->ordered()
        ->get(['id', 'name', 'website_url', 'logo_path'])
        ->map(fn (Partner $partner) => [
            'id' => $partner->id,
            'name' => $partner->name,
            'website_url' => $partner->website_url,
            'logo_url' => $partner->logo_path ? asset('storage/' . $partner->logo_path) : null,
        ]);

    return Inertia::render('welcome', [
        'partners' => $partners,
    ]);
})->name('home');

Route::get('/a-propos', [AboutController::class, 'index'])->name('about');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::get('/publications', [PublicationController::class, 'index'])->name('publications');

Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('messages', function () {
        $messages = Contact::query()
            ->latest()
            ->get(['id', 'name', 'email', 'subject', 'message', 'created_at'])
            ->map(fn (Contact $contact) => [
                'id' => $contact->id,
                'name' => $contact->name,
                'email' => $contact->email,
                'subject' => $contact->subject,
                'message' => $contact->message,
                'created_at' => $contact->created_at?->toIso8601String(),
            ]);

        return Inertia::render('dashboard/messages', [
            'messages' => $messages,
        ]);
    })->name('dashboard.messages.index');

    Route::get('about-documents', function () {
        $documents = \App\Models\AboutDocument::query()
            ->orderByDesc('id')
            ->get(['id', 'title_fr', 'title_ar', 'title_en', 'file_path', 'is_published'])
            ->map(fn (\App\Models\AboutDocument $document) => [
                'id' => $document->id,
                'title_fr' => $document->title_fr,
                'title_ar' => $document->title_ar,
                'title_en' => $document->title_en,
                'file_url' => $document->file_path ? asset('storage/' . $document->file_path) : null,
                'is_published' => $document->is_published,
            ]);

        return Inertia::render('dashboard/about-documents', [
            'documents' => $documents,
        ]);
    })->name('dashboard.about-documents.index');

    Route::post('about-documents', [AboutDocumentController::class, 'store'])->name('dashboard.about-documents.store');
    Route::put('about-documents/{aboutDocument}', [AboutDocumentController::class, 'update'])->name('dashboard.about-documents.update');
    Route::delete('about-documents/{aboutDocument}', [AboutDocumentController::class, 'destroy'])->name('dashboard.about-documents.destroy');

    Route::get('partners', function () {
        $partners = Partner::query()
            ->ordered()
            ->get(['id', 'name', 'website_url', 'logo_path', 'is_active', 'sort_order'])
            ->map(fn (Partner $partner) => [
                'id' => $partner->id,
                'name' => $partner->name,
                'website_url' => $partner->website_url,
                'logo_url' => $partner->logo_path ? asset('storage/' . $partner->logo_path) : null,
                'is_active' => $partner->is_active,
                'sort_order' => $partner->sort_order,
            ]);

        return Inertia::render('dashboard/partners', [
            'partners' => $partners,
        ]);
    })->name('dashboard.partners.index');

    Route::post('partners', [PartnerController::class, 'store'])->name('dashboard.partners.store');
    Route::put('partners/{partner}', [PartnerController::class, 'update'])->name('dashboard.partners.update');
    Route::delete('partners/{partner}', [PartnerController::class, 'destroy'])->name('dashboard.partners.destroy');
    Route::get('publications', [PublicationController::class, 'dashboardIndex'])->name('dashboard.publications.index');
    Route::post('publications', [PublicationController::class, 'store'])->name('dashboard.publications.store');
    Route::put('publications/{publication}', [PublicationController::class, 'update'])->name('dashboard.publications.update');
    Route::delete('publications/{publication}', [PublicationController::class, 'destroy'])->name('dashboard.publications.destroy');

    Route::get('programmes', [ProgrammeController::class, 'dashboardIndex'])->name('dashboard.programmes.index');
    Route::post('programmes', [ProgrammeController::class, 'store'])->name('dashboard.programmes.store');
    Route::put('programmes/{programme}', [ProgrammeController::class, 'update'])->name('dashboard.programmes.update');
    Route::delete('programmes/{programme}', [ProgrammeController::class, 'destroy'])->name('dashboard.programmes.destroy');

    Route::get('aide-requests', function () {
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
require __DIR__ . '/blog.php';
require __DIR__ . '/auth.php';
