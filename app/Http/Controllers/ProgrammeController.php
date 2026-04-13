<?php

namespace App\Http\Controllers;

use App\Models\Programme;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProgrammeController extends Controller
{
    public function index(): Response
    {
        $programmes = Programme::query()
            ->where('is_published', true)
            ->orderByDesc('id')
            ->get([
                'id',
                'title_fr',
                'title_ar',
                'title_en',
                'summary_fr',
                'summary_ar',
                'summary_en',
                'image_path',
                'image_url',
                'status',
                'beneficiaires',
                'region_fr',
                'region_ar',
                'region_en',
                'partners',
                'budget',
                'project_file_path',
                'project_file_url',
            ])
            ->map(fn (Programme $programme) => $this->formatProgramme($programme));

        return Inertia::render('clients/programmes/index', [
            'programmes' => $programmes,
        ]);
    }

    public function show(Programme $programme): Response
    {
        abort_unless($programme->is_published, 404);

        return Inertia::render('clients/programmes/[id]', [
            'programme' => $this->formatProgramme($programme, true),
        ]);
    }

    public function dashboardIndex(): Response
    {
        $programmes = Programme::query()
            ->orderByDesc('id')
            ->get([
                'id',
                'title_fr',
                'title_ar',
                'title_en',
                'summary_fr',
                'summary_ar',
                'summary_en',
                'image_path',
                'image_url',
                'status',
                'beneficiaires',
                'region_fr',
                'region_ar',
                'region_en',
                'partners',
                'budget',
                'project_file_path',
                'project_file_url',
                'is_published',
            ])
            ->map(fn (Programme $programme) => $this->formatProgramme($programme, true));

        return Inertia::render('dashboard/programmes', [
            'programmes' => $programmes,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title_fr' => ['required', 'string', 'max:255'],
            'title_ar' => ['required', 'string', 'max:255'],
            'title_en' => ['required', 'string', 'max:255'],
            'summary_fr' => ['required', 'string'],
            'summary_ar' => ['required', 'string'],
            'summary_en' => ['required', 'string'],
            'image' => ['required', 'file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'status' => ['required', 'in:active,closed'],
            'beneficiaires' => ['nullable', 'integer', 'min:0'],
            'region_fr' => ['nullable', 'string', 'max:255'],
            'region_ar' => ['nullable', 'string', 'max:255'],
            'region_en' => ['nullable', 'string', 'max:255'],
            'partners' => ['nullable', 'string'],
            'budget' => ['nullable', 'string', 'max:255'],
            'project_file' => ['nullable', 'file', 'mimes:pdf', 'max:10240'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        $imagePath = $request->file('image')->store('programmes/images', 'public');
        $projectFilePath = $request->hasFile('project_file')
            ? $request->file('project_file')->store('programmes/files', 'public')
            : null;

        Programme::query()->create([
            'title_fr' => $validated['title_fr'],
            'title_ar' => $validated['title_ar'],
            'title_en' => $validated['title_en'],
            'summary_fr' => $validated['summary_fr'],
            'summary_ar' => $validated['summary_ar'],
            'summary_en' => $validated['summary_en'],
            'image_path' => $imagePath,
            'image_url' => asset('storage/' . $imagePath),
            'status' => $validated['status'],
            'beneficiaires' => $validated['beneficiaires'] ?? null,
            'region_fr' => $validated['region_fr'] ?? null,
            'region_ar' => $validated['region_ar'] ?? null,
            'region_en' => $validated['region_en'] ?? null,
            'partners' => $this->parsePartners($validated['partners'] ?? ''),
            'budget' => $validated['budget'] ?? null,
            'project_file_path' => $projectFilePath,
            'project_file_url' => $projectFilePath ? asset('storage/' . $projectFilePath) : null,
            'is_published' => (bool) ($validated['is_published'] ?? false),
        ]);

        return back()->with('success', 'Programme ajoute avec succes.');
    }

    public function update(Request $request, Programme $programme): RedirectResponse
    {
        $validated = $request->validate([
            'title_fr' => ['required', 'string', 'max:255'],
            'title_ar' => ['required', 'string', 'max:255'],
            'title_en' => ['required', 'string', 'max:255'],
            'summary_fr' => ['required', 'string'],
            'summary_ar' => ['required', 'string'],
            'summary_en' => ['required', 'string'],
            'image' => ['nullable', 'file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'status' => ['required', 'in:active,closed'],
            'beneficiaires' => ['nullable', 'integer', 'min:0'],
            'region_fr' => ['nullable', 'string', 'max:255'],
            'region_ar' => ['nullable', 'string', 'max:255'],
            'region_en' => ['nullable', 'string', 'max:255'],
            'partners' => ['nullable', 'string'],
            'budget' => ['nullable', 'string', 'max:255'],
            'project_file' => ['nullable', 'file', 'mimes:pdf', 'max:10240'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        $updateData = [
            'title_fr' => $validated['title_fr'],
            'title_ar' => $validated['title_ar'],
            'title_en' => $validated['title_en'],
            'summary_fr' => $validated['summary_fr'],
            'summary_ar' => $validated['summary_ar'],
            'summary_en' => $validated['summary_en'],
            'status' => $validated['status'],
            'beneficiaires' => $validated['beneficiaires'] ?? null,
            'region_fr' => $validated['region_fr'] ?? null,
            'region_ar' => $validated['region_ar'] ?? null,
            'region_en' => $validated['region_en'] ?? null,
            'partners' => $this->parsePartners($validated['partners'] ?? ''),
            'budget' => $validated['budget'] ?? null,
            'is_published' => (bool) ($validated['is_published'] ?? false),
        ];

        if ($request->hasFile('image')) {
            if ($programme->image_path) {
                Storage::disk('public')->delete($programme->image_path);
            }

            $updateData['image_path'] = $request->file('image')->store('programmes/images', 'public');
            $updateData['image_url'] = asset('storage/' . $updateData['image_path']);
        }

        if ($request->hasFile('project_file')) {
            if ($programme->project_file_path) {
                Storage::disk('public')->delete($programme->project_file_path);
            }

            $updateData['project_file_path'] = $request->file('project_file')->store('programmes/files', 'public');
            $updateData['project_file_url'] = asset('storage/' . $updateData['project_file_path']);
        }

        $programme->update($updateData);

        return back()->with('success', 'Programme modifie avec succes.');
    }

    public function destroy(Programme $programme): RedirectResponse
    {
        if ($programme->image_path) {
            Storage::disk('public')->delete($programme->image_path);
        }

        if ($programme->project_file_path) {
            Storage::disk('public')->delete($programme->project_file_path);
        }

        $programme->delete();

        return back()->with('success', 'Programme supprime avec succes.');
    }

    private function parsePartners(string $partnersRaw): array
    {
        return collect(explode(',', $partnersRaw))
            ->map(fn (string $partner) => trim($partner))
            ->filter()
            ->values()
            ->all();
    }

    private function formatProgramme(Programme $programme, bool $includeStatus = false): array
    {
        $payload = [
            'id' => $programme->id,
            'title_fr' => $programme->title_fr,
            'title_ar' => $programme->title_ar,
            'title_en' => $programme->title_en,
            'summary_fr' => $programme->summary_fr,
            'summary_ar' => $programme->summary_ar,
            'summary_en' => $programme->summary_en,
            'image' => $programme->image_path ? asset('storage/' . $programme->image_path) : $programme->image_url,
            'status' => $programme->status,
            'beneficiaires' => $programme->beneficiaires,
            'region' => $programme->region_fr,
            'region_fr' => $programme->region_fr,
            'region_ar' => $programme->region_ar,
            'region_en' => $programme->region_en,
            'partenaires' => $programme->partners ?? [],
            'budget' => $programme->budget,
            'project_file_url' => $programme->project_file_path ? asset('storage/' . $programme->project_file_path) : $programme->project_file_url,
            'slug' => $programme->id,
        ];

        if ($includeStatus) {
            $payload['is_published'] = $programme->is_published;
        }

        return $payload;
    }
}
