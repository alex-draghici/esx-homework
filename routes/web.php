<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return 'Hello World';
});

require __DIR__.'/auth.php';
