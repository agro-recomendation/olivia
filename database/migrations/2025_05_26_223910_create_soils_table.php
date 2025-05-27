<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('soils', function (Blueprint $table) {
            $table->id();
            $table->string('soil_type')->nullable();
            $table->decimal('accuracy', 5, 2)->default(0.00); // typo diperbaiki
            $table->foreignId('plant_recomendation_id')
                ->constrained('plant_recomendations')
                ->onDelete('cascade');
            $table->float('K')->nullable();
            $table->float('P')->nullable();
            $table->float('N')->nullable();
            $table->float('pH')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();   // decimal untuk koordinat
            $table->decimal('longitude', 10, 7)->nullable();  // decimal untuk koordinat
            $table->string('location')->nullable();
            $table->float('humidity')->nullable();            // float untuk kelembapan
            $table->float('temperature')->nullable();         // float untuk suhu
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('soils');
    }
};
