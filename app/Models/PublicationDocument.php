<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PublicationDocument extends Model
{
    protected $fillable = [
        'title_fr',
        'title_ar',
        'title_en',
        'description_fr',
        'description_ar',
        'description_en',
        'category',
        'published_at',
        'file_path',
        'is_published',
    ];

    protected $casts = [
        'published_at' => 'date',
        'is_published' => 'boolean',
    ];
}
