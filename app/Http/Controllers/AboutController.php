<?php

namespace App\Http\Controllers;

use App\Models\AboutDocument;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $documents = AboutDocument::query()
            ->where('is_published', true)
            ->orderByDesc('id')
            ->get(['id', 'title_fr', 'title_ar', 'title_en', 'file_path'])
            ->map(fn (AboutDocument $document) => [
                'id' => $document->id,
                'title_fr' => $document->title_fr,
                'title_ar' => $document->title_ar,
                'title_en' => $document->title_en,
                'file_url' => asset('storage/' . $document->file_path),
            ]);

        return Inertia::render('a-propos/index', [
            'documents' => $documents,
        ]);
    }
}
