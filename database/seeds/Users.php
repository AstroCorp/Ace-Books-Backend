<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class Users extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = new User();
        $admin->email = 'admin@example.com';
        $admin->email_verified_at = now();
        $admin->password = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'; // password
        $admin->rank_id = 2;
        $admin->lang_id = 2;
        $admin->remember_token = Str::random(10);
        $admin->save();

        $user1 = new User();
        $user1->email = 'user1@example.com';
        $user1->email_verified_at = now();
        $user1->password = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'; // password
        $user1->remember_token = Str::random(10);
        $user1->save();
    }
}
