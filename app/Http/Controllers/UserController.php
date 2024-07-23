<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * @return Collection
     */
    public function index(): Collection
    {
        return User::all();
    }

    /**
     * @param $id
     * @return Collection
     */
    public function show($id): Collection
    {
        if ($id === "trashed") {
            return User::onlyTrashed()->get();
        }

        return User::findOrFail($id);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function store(Request $request): mixed
    {
        $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email:rfc,dns', 'max:255', 'unique:' . User::class],
            'password' => ['required', Rules\Password::defaults()],
        ]);

        return User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    }

    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function update(Request $request, $id): mixed
    {
        $user = User::findOrFail($id);

        $request->validate([
            'first_name' => ['sometimes', 'string', 'max:255'],
            'last_name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'string', 'lowercase', 'email:rfc,dns', 'max:255', 'unique:users,email,' . $user->id],
            'password' => $request->password !== null ? ['sometimes', Rules\Password::defaults()] : '',
        ]);

        $user->update(
            $request->only('first_name', 'last_name', 'email')
        );

        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }

        return $user;
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully.']);
    }

    /**
     * @return Collection
     */
    public function trashed()
    {
        return User::onlyTrashed()->get();
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function restore($id): JsonResponse
    {
        $user = User::withTrashed()->findOrFail($id);
        $user->restore();

        return response()->json(['message' => 'User restored successfully.']);
    }
}
