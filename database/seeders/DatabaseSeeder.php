<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Run role & permission seeder first
        $this->call([
            RolePermissionSeeder::class,
            UserSeeder::class,
            CategoryBrandProductSeeder::class,
            TransactionSeeder::class,
        ]);
    }
}
