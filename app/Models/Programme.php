<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Programme extends Model
{
    protected $fillable = [
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
    ];

    protected $casts = [
        'beneficiaires' => 'integer',
        'partners' => 'array',
        'is_published' => 'boolean',
    ];
}
