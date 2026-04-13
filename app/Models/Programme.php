<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Programme extends Model
{
    protected $fillable = [
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
    ];

    protected $casts = [
        'beneficiaires' => 'integer',
        'partners' => 'array',
        'is_published' => 'boolean',
    ];
}
