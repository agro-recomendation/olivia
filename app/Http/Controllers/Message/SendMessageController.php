<?php

namespace App\Http\Controllers\Message;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SendMessageController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'telephone' => 'required|numeric',
            'message' => 'required|string|max:500',
        ]);

        $user = $request->user();

        if ($request->user()) {
            $message = $request->user()->messages()->create([
                'user_id' => $request->user()->id,
                'telephone' => $request->input('telephone'),
                'message' => $request->input('message'),
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Message sent successfully.',
                'data' => $message,
            ], 201);
        }
        return response()->json([
            'status' => 'error',
            'message' => 'Unauthorized.',
        ], 401);
    }
}
