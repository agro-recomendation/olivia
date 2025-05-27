<?php

namespace App\Http\Controllers\Message;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SendMessageController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        try {
            Log::info('Contact message validation attempt', [
                'user_id' => optional($request->user())->id,
                'telephone' => $request->input('telephone'),
            ]);
            $request->validate([
                'telephone' => 'required|numeric',
                'message' => 'required|string|max:500',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::warning('Validation error on contact message', [
                'errors' => $e->errors(),
                'user_id' => optional($request->user())->id,
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Unexpected error during validation', [
                'error' => $e->getMessage(),
                'user_id' => optional($request->user())->id,
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Unexpected error during validation.',
                'error' => $e->getMessage(),
            ], 500);
        }

        try {
            $user = $request->user();
            Log::info('Contact message user check', ['user' => $user ? $user->id : null]);

            if ($user) {
                $message = $user->messages()->create([
                    'user_id' => $user->id,
                    'telephone' => $request->input('telephone'),
                    'message' => $request->input('message'),
                ]);

                Log::info('Contact message saved', [
                    'user_id' => $user->id,
                    'message_id' => $message->id,
                ]);

                return response()->json([
                    'status' => 'success',
                    'message' => 'Message sent successfully.',
                    'data' => $message,
                ], 201);
            }

            Log::warning('Unauthorized contact message attempt', [
                'telephone' => $request->input('telephone'),
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized.',
            ], 401);
        } catch (\Exception $e) {
            Log::error('Failed to send contact message', [
                'error' => $e->getMessage(),
                'user_id' => optional($request->user())->id,
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to send message.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
