<?php

namespace App\Http\Controllers\Message;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;

class SendMessageController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'telephone' => 'required|string|max:15',
            'message' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id', // optional, but if provided must exist
        ]);

        $message = new Message();
        $message->user_id = $request->input('user_id', Auth::id()); // Use Auth::id() if user_id is not provided
        $message->telephone = $request->input('telephone');
        $message->message = $request->input('message');
        $message->save();

        Log::info('Message sent', [
            'user_id' => $message->user_id,
            'telephone' => $message->telephone,
            'message' => $message->message,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Message sent successfully',
        ], 200);
    }

}
