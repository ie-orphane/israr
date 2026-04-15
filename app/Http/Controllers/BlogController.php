<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    private function locale(): string
    {
        $locale = app()->getLocale();

        return in_array($locale, ['fr', 'ar'], true) ? $locale : 'fr';
    }

    private function translate(Blog $blog, string $attribute, string $locale): string
    {
        $value = $blog->{$attribute . '_' . $locale};
        if (filled($value)) {
            return (string) $value;
        }

        $fallback = $blog->{$attribute . '_fr'} ?? $blog->{$attribute . '_ar'};

        return (string) $fallback;
    }

    private function formatBlog(Blog $blog, ?string $locale = null, bool $includeBody = false): array
    {
        $currentLocale = $locale ?? $this->locale();
        $publishedAt = $blog->published_at ? date('j F Y', strtotime((string) $blog->published_at)) : null;
        $publishedAtIso = $blog->published_at ? date('Y-m-d', strtotime((string) $blog->published_at)) : null;
        $localizedBody = $this->translate($blog, 'body', $currentLocale);

        $payload = [
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
            'published_at_iso' => $publishedAtIso,
            'is_published' => $blog->is_published,
            'url' => '/blogs/' . $blog->slug,
            'title' => $this->translate($blog, 'title', $currentLocale),
            'excerpt' => $this->translate($blog, 'excerpt', $currentLocale),
            'body_preview' => Str::limit(trim(strip_tags($localizedBody)), 220),
            'category' => $this->translate($blog, 'category', $currentLocale),
        ];

        if ($includeBody) {
            $payload['body'] = $localizedBody;
        }

        return $payload;
    }

    public function index(Request $request): Response
    {
        $locale = $this->locale();
        $selectedCategory = trim((string) $request->query('category', 'all'));

        $publishedQuery = Blog::query()->where('is_published', true);

        $categories = Blog::query()
            ->where('is_published', true)
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->get(['id', 'category_fr', 'category_ar'])
            ->map(fn (Blog $blog) => $this->translate($blog, 'category', $locale))
            ->filter(fn (string $category) => $category !== '')
            ->unique()
            ->values()
            ->all();

        if ($selectedCategory !== 'all' && in_array($selectedCategory, $categories, true)) {
            $publishedQuery->where("category_{$locale}", $selectedCategory);
        } else {
            $selectedCategory = 'all';
        }

        $paginated = $publishedQuery
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->paginate(6)
            ->withQueryString();

        $blogs = collect($paginated->items())
            ->map(fn (Blog $blog) => $this->formatBlog($blog, $locale))
            ->values()
            ->all();

        $pagination = [
            'current_page' => $paginated->currentPage(),
            'last_page' => $paginated->lastPage(),
            'per_page' => $paginated->perPage(),
            'total' => $paginated->total(),
            'links' => $paginated->linkCollection()->map(fn ($link) => [
                'url' => data_get($link, 'url'),
                'label' => data_get($link, 'label'),
                'active' => (bool) data_get($link, 'active'),
            ])->all(),
            'prev_url' => $paginated->previousPageUrl(),
            'next_url' => $paginated->nextPageUrl(),
        ];

        return Inertia::render('blog/index', [
            'blogs' => $blogs,
            'pagination' => $pagination,
            'categories' => $categories,
            'activeCategory' => $selectedCategory,
        ]);
    }

    public function show(Blog $blog): Response
    {
        abort_unless($blog->is_published, 404);

        return Inertia::render('blog/[slug]', [
            'blog' => $this->formatBlog($blog, $this->locale(), true),
        ]);
    }
}
