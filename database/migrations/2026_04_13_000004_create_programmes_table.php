<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('programmes', function (Blueprint $table) {
            $table->id();
            $table->string('title_fr');
            $table->string('title_ar');
            $table->string('title_en');
            $table->text('summary_fr');
            $table->text('summary_ar');
            $table->text('summary_en');
            $table->string('image_url', 2048);
            $table->enum('status', ['active', 'closed'])->default('active');
            $table->unsignedInteger('beneficiaires')->nullable();
            $table->string('region_fr')->nullable();
            $table->string('region_ar')->nullable();
            $table->string('region_en')->nullable();
            $table->json('partners')->nullable();
            $table->string('budget')->nullable();
            $table->string('project_file_url', 2048)->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('programmes');
    }
};
