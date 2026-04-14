<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutDocument extends Model
{
    protected $fillable = [
        'title_fr',
        'title_ar',
        'file_path',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];
}