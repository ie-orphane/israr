<?php

namespace App\Http\Controllers;

use App\Models\PublicationDocument;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PublicationController extends Controller
{
    public function index(): Response
    {
        $publications = PublicationDocument::query()
            ->whereNotNull('file_path')
            ->where('is_published', true)
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->get([
                'id',
                'title_fr',
                'title_ar',
                'description_fr',
                'description_ar',
                'category',
                'published_at',
                'file_path',
                'is_published',
            ])
            ->map(fn (PublicationDocument $publication) => [
                'id' => $publication->id,
                'title_fr' => $publication->title_fr,
                'title_ar' => $publication->title_ar,
                'description_fr' => $publication->description_fr,
                'description_ar' => $publication->description_ar,
                'category' => $publication->category,
                'date' => $publication->published_at ? date('Y-m-d', strtotime((string) $publication->published_at)) : null,
                'file_url' => asset('storage/' . $publication->file_path),
                'is_published' => $publication->is_published,
            ]);

        return Inertia::render('publications/index', [
            'publications' => $publications,
        ]);
    }

    public function dashboardIndex(): Response
    {
        $publications = PublicationDocument::query()
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->get([
                'id',
                'title_fr',
                'title_ar',
                'description_fr',
                'description_ar',
                'category',
                'published_at',
                'file_path',
                'is_published',
            ])
            ->map(fn (PublicationDocument $publication) => [
                'id' => $publication->id,
                'title_fr' => $publication->title_fr,
                'title_ar' => $publication->title_ar,
                'description_fr' => $publication->description_fr,
                'description_ar' => $publication->description_ar,
                'category' => $publication->category,
                'date' => $publication->published_at ? date('Y-m-d', strtotime((string) $publication->published_at)) : null,
                'file_url' => $publication->file_path ? asset('storage/' . $publication->file_path) : null,
                'is_published' => $publication->is_published,
            ]);

        return Inertia::render('dashboard/publications', [
            'publications' => $publications,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title_fr' => ['required', 'string', 'max:255'],
            'title_ar' => ['required', 'string', 'max:255'],
            'description_fr' => ['required', 'string'],
            'description_ar' => ['required', 'string'],
            'category' => ['required', 'in:rapport,plaidoyer,communique,guide'],
            'published_at' => ['required', 'date'],
            'document' => ['required', 'file', 'mimes:pdf,doc,docx,ppt,pptx,xls,xlsx', 'max:10240'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        $documentPath = $request->file('document')->store('publications', 'public');

        PublicationDocument::query()->create([
            'title_fr' => $validated['title_fr'],
            'title_ar' => $validated['title_ar'],
            'description_fr' => $validated['description_fr'],
            'description_ar' => $validated['description_ar'],
            'category' => $validated['category'],
            'published_at' => $validated['published_at'],
            'file_path' => $documentPath,
            'is_published' => (bool) ($validated['is_published'] ?? false),
        ]);

        return back()->with('success', 'Document ajoute avec succes.');
    }

    public function update(Request $request, PublicationDocument $publication): RedirectResponse
    {
        $validated = $request->validate([
            'title_fr' => ['required', 'string', 'max:255'],
            'title_ar' => ['required', 'string', 'max:255'],
            'description_fr' => ['required', 'string'],
            'description_ar' => ['required', 'string'],
            'category' => ['required', 'in:rapport,plaidoyer,communique,guide'],
            'published_at' => ['required', 'date'],
            'document' => ['nullable', 'file', 'mimes:pdf,doc,docx,ppt,pptx,xls,xlsx', 'max:10240'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        if ($request->hasFile('document')) {
            if ($publication->file_path) {
                Storage::disk('public')->delete($publication->file_path);
            }

            $publication->file_path = $request->file('document')->store('publications', 'public');
        }

        $publication->title_fr = $validated['title_fr'];
        $publication->title_ar = $validated['title_ar'];
        $publication->description_fr = $validated['description_fr'];
        $publication->description_ar = $validated['description_ar'];
        $publication->category = $validated['category'];
        $publication->published_at = $validated['published_at'];
        $publication->is_published = (bool) ($validated['is_published'] ?? false);
        $publication->save();

        return back()->with('success', 'Document modifie avec succes.');
    }

    public function destroy(PublicationDocument $publication): RedirectResponse
    {
        if ($publication->file_path) {
            Storage::disk('public')->delete($publication->file_path);
        }

        $publication->delete();

        return back()->with('success', 'Document supprime avec succes.');
    }
}
