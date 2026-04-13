<?php

namespace App\Http\Controllers;

use App\Models\AboutDocument;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class AboutDocumentController extends Controller
{
    public function index(): Response
    {
        $documents = AboutDocument::query()
            ->orderByDesc('id')
            ->get(['id', 'title_fr', 'title_ar', 'title_en', 'file_path', 'is_published'])
            ->map(fn (AboutDocument $document) => [
                'id' => $document->id,
                'title_fr' => $document->title_fr,
                'title_ar' => $document->title_ar,
                'title_en' => $document->title_en,
                'file_url' => asset('storage/' . $document->file_path),
                'is_published' => $document->is_published,
            ]);

        return inertia('a-propos/index', [
            'documents' => $documents,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title_fr' => ['required', 'string', 'max:255'],
            'title_ar' => ['required', 'string', 'max:255'],
            'title_en' => ['required', 'string', 'max:255'],
            'document' => ['required', 'file', 'mimes:pdf,doc,docx,ppt,pptx,xls,xlsx', 'max:10240'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        $filePath = $request->file('document')->store('about-documents', 'public');

        AboutDocument::query()->create([
            'title_fr' => $validated['title_fr'],
            'title_ar' => $validated['title_ar'],
            'title_en' => $validated['title_en'],
            'file_path' => $filePath,
            'is_published' => (bool) ($validated['is_published'] ?? false),
        ]);

        return back()->with('success', 'Document ajoute avec succes.');
    }

    public function update(Request $request, AboutDocument $aboutDocument): RedirectResponse
    {
        $validated = $request->validate([
            'title_fr' => ['required', 'string', 'max:255'],
            'title_ar' => ['required', 'string', 'max:255'],
            'title_en' => ['required', 'string', 'max:255'],
            'document' => ['nullable', 'file', 'mimes:pdf,doc,docx,ppt,pptx,xls,xlsx', 'max:10240'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        if ($request->hasFile('document')) {
            if ($aboutDocument->file_path) {
                Storage::disk('public')->delete($aboutDocument->file_path);
            }

            $aboutDocument->file_path = $request->file('document')->store('about-documents', 'public');
        }

        $aboutDocument->title_fr = $validated['title_fr'];
        $aboutDocument->title_ar = $validated['title_ar'];
        $aboutDocument->title_en = $validated['title_en'];
        $aboutDocument->is_published = (bool) ($validated['is_published'] ?? false);
        $aboutDocument->save();

        return back()->with('success', 'Document modifie avec succes.');
    }

    public function destroy(AboutDocument $aboutDocument): RedirectResponse
    {
        if ($aboutDocument->file_path) {
            Storage::disk('public')->delete($aboutDocument->file_path);
        }

        $aboutDocument->delete();

        return back()->with('success', 'Document supprime avec succes.');
    }
}