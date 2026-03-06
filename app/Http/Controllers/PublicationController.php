<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PublicationController extends Controller
{
    public function index()
    {
        return Inertia::render('publications/index');
    }
}
