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
                'summary_fr',
                'summary_ar',
                'image_path',
                'status',
                'beneficiaires',
                'region_fr',
                'region_ar',
                'partners',
                'budget',
                'project_file_path',
            ])
            ->map(fn (Programme $programme) => $this->formatProgramme($programme));

        return Inertia::render('programmes/index', [
            'programmes' => $programmes,
        ]);
    }

    public function show(Programme $programme): Response
    {
        abort_unless($programme->is_published, 404);

        return Inertia::render('programmes/[id]', [
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
                'summary_fr',
                'summary_ar',
                'image_path',
                'status',
                'beneficiaires',
                'region_fr',
                'region_ar',
                'partners',
                'budget',
                'project_file_path',
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
            'summary_fr' => ['required', 'string'],
            'summary_ar' => ['required', 'string'],
            'image' => ['required', 'file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'status' => ['required', 'in:active,closed'],
            'beneficiaires' => ['nullable', 'integer', 'min:0'],
            'region_fr' => ['nullable', 'string', 'max:255'],
            'region_ar' => ['nullable', 'string', 'max:255'],
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
            'summary_fr' => $validated['summary_fr'],
            'summary_ar' => $validated['summary_ar'],
            'image_path' => $imagePath,
            'status' => $validated['status'],
            'beneficiaires' => $validated['beneficiaires'] ?? null,
            'region_fr' => $validated['region_fr'] ?? null,
            'region_ar' => $validated['region_ar'] ?? null,
            'partners' => $this->parsePartners($validated['partners'] ?? ''),
            'budget' => $validated['budget'] ?? null,
            'project_file_path' => $projectFilePath,
            'is_published' => (bool) ($validated['is_published'] ?? false),
        ]);

        return back()->with('success', 'Programme ajoute avec succes.');
    }

    public function update(Request $request, Programme $programme): RedirectResponse
    {
        $validated = $request->validate([
            'title_fr' => ['required', 'string', 'max:255'],
            'title_ar' => ['required', 'string', 'max:255'],
            'summary_fr' => ['required', 'string'],
            'summary_ar' => ['required', 'string'],
            'image' => ['nullable', 'file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'status' => ['required', 'in:active,closed'],
            'beneficiaires' => ['nullable', 'integer', 'min:0'],
            'region_fr' => ['nullable', 'string', 'max:255'],
            'region_ar' => ['nullable', 'string', 'max:255'],
            'partners' => ['nullable', 'string'],
            'budget' => ['nullable', 'string', 'max:255'],
            'project_file' => ['nullable', 'file', 'mimes:pdf', 'max:10240'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        $updateData = [
            'title_fr' => $validated['title_fr'],
            'title_ar' => $validated['title_ar'],
            'summary_fr' => $validated['summary_fr'],
            'summary_ar' => $validated['summary_ar'],
            'status' => $validated['status'],
            'beneficiaires' => $validated['beneficiaires'] ?? null,
            'region_fr' => $validated['region_fr'] ?? null,
            'region_ar' => $validated['region_ar'] ?? null,
            'partners' => $this->parsePartners($validated['partners'] ?? ''),
            'budget' => $validated['budget'] ?? null,
            'is_published' => (bool) ($validated['is_published'] ?? false),
        ];

        if ($request->hasFile('image')) {
            if ($programme->image_path) {
                Storage::disk('public')->delete($programme->image_path);
            }

            $updateData['image_path'] = $request->file('image')->store('programmes/images', 'public');
        }

        if ($request->hasFile('project_file')) {
            if ($programme->project_file_path) {
                Storage::disk('public')->delete($programme->project_file_path);
            }

            $updateData['project_file_path'] = $request->file('project_file')->store('programmes/files', 'public');
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
            'summary_fr' => $programme->summary_fr,
            'summary_ar' => $programme->summary_ar,
            'image' => asset('storage/' . $programme->image_path),
            'status' => $programme->status,
            'beneficiaires' => $programme->beneficiaires,
            'region' => $programme->region_fr,
            'region_fr' => $programme->region_fr,
            'region_ar' => $programme->region_ar,
            'partenaires' => $programme->partners ?? [],
            'budget' => $programme->budget,
            'project_file_url' => $programme->project_file_path ? asset('storage/' . $programme->project_file_path) : null,
            'slug' => $programme->id,
        ];

        if ($includeStatus) {
            $payload['is_published'] = $programme->is_published;
        }

        return $payload;
    }
}
