<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        $blogs = Blog::query()
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->get()
            ->map(fn (Blog $blog) => $this->formatBlog($blog))
            ->all();

        return Inertia::render('dashboard/blogs', [
            'blogs' => $blogs,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/blogs', [
            'blogs' => [],
            'createOpen' => true,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validateBlog($request);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('blogs', 'public');
        }

        Blog::query()->create([
            'slug' => $validated['slug'] ?: null,
            'title_fr' => $validated['title_fr'],
            'title_ar' => $validated['title_ar'],
            'excerpt_fr' => $validated['excerpt_fr'] ?? null,
            'excerpt_ar' => $validated['excerpt_ar'] ?? null,
            'body_fr' => $validated['body_fr'],
            'body_ar' => $validated['body_ar'],
            'category_fr' => $validated['category_fr'],
            'category_ar' => $validated['category_ar'],
            'author' => $validated['author'] ?? null,
            'image_path' => $imagePath,
            'published_at' => $validated['published_at'] ?? null,
            'is_published' => (bool) ($validated['is_published'] ?? false),
        ]);

        return back()->with('success', 'Article ajoute avec succes.');
    }

    public function edit(Blog $blog): Response
    {
        return Inertia::render('dashboard/blogs', [
            'blogs' => Blog::query()
                ->orderByDesc('published_at')
                ->orderByDesc('id')
                ->get()
                ->map(fn (Blog $item) => $this->formatBlog($item))
                ->all(),
            'editingBlog' => $this->formatBlog($blog),
        ]);
    }

    public function update(Request $request, Blog $blog): RedirectResponse
    {
        $validated = $this->validateBlog($request, $blog);

        $imagePath = $blog->image_path;
        if ($request->hasFile('image')) {
            if ($blog->image_path) {
                Storage::disk('public')->delete($blog->image_path);
            }

            $imagePath = $request->file('image')->store('blogs', 'public');
        }

        $blog->update([
            'slug' => $validated['slug'] ?: $blog->slug,
            'title_fr' => $validated['title_fr'],
            'title_ar' => $validated['title_ar'],
            'excerpt_fr' => $validated['excerpt_fr'] ?? null,
            'excerpt_ar' => $validated['excerpt_ar'] ?? null,
            'body_fr' => $validated['body_fr'],
            'body_ar' => $validated['body_ar'],
            'category_fr' => $validated['category_fr'],
            'category_ar' => $validated['category_ar'],
            'author' => $validated['author'] ?? null,
            'image_path' => $imagePath,
            'published_at' => $validated['published_at'] ?? null,
            'is_published' => (bool) ($validated['is_published'] ?? false),
        ]);

        return back()->with('success', 'Article mis a jour avec succes.');
    }

    public function destroy(Blog $blog): RedirectResponse
    {
        if ($blog->image_path) {
            Storage::disk('public')->delete($blog->image_path);
        }

        $blog->delete();

        return back()->with('success', 'Article supprime avec succes.');
    }

    private function validateBlog(Request $request, ?Blog $blog = null): array
    {
        return $request->validate([
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('blogs', 'slug')->ignore($blog?->id),
            ],
            'title_fr' => ['required', 'string', 'max:255'],
            'title_ar' => ['required', 'string', 'max:255'],
            'excerpt_fr' => ['nullable', 'string'],
            'excerpt_ar' => ['nullable', 'string'],
            'body_fr' => ['required', 'string'],
            'body_ar' => ['required', 'string'],
            'category_fr' => ['required', 'string', 'max:255'],
            'category_ar' => ['required', 'string', 'max:255'],
            'author' => ['nullable', 'string', 'max:120'],
            'image' => ['nullable', 'file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'published_at' => ['nullable', 'date'],
            'is_published' => ['nullable', 'boolean'],
        ]);
    }

    private function formatBlog(Blog $blog): array
    {
        $publishedAt = $blog->published_at ? date('Y-m-d', strtotime((string) $blog->published_at)) : null;

        return [
            'id' => $blog->id,
            'slug' => $blog->slug,
            'title_fr' => $blog->title_fr,
            'title_ar' => $blog->title_ar,
            'excerpt_fr' => $blog->excerpt_fr,
            'excerpt_ar' => $blog->excerpt_ar,
            'body_fr' => $blog->body_fr,
            'body_ar' => $blog->body_ar,
            'category_fr' => $blog->category_fr,
            'category_ar' => $blog->category_ar,
            'author' => $blog->author,
            'image_url' => $blog->image_path ? asset('storage/' . $blog->image_path) : null,
            'published_at' => $publishedAt,
            'is_published' => $blog->is_published,
        ];
    }
}
