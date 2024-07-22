<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'first_name' => 'Alexandru',
            'last_name' => 'Draghici',
            'email' => 'john.doe@example.com',
            'password' => Hash::make('password'),
        ]);
    }
}
