<?php

namespace App\Http\Controllers\Aide;

use App\Http\Controllers\Controller;
use App\Models\AideRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class FormulaireController extends Controller
{
    /**
     * Show the help form page
     */
    public function create(): Response
    {
        return Inertia::render('aide/Formulaire');
    }

    /**
     * Store a new help request
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'region' => ['required', 'string', 'max:255'],
            'type_of_violence' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:5000'],
            'contact_method' => ['required', 'string', 'in:email,phone,other'],
            'contact_value' => ['required_if:contact_method,email,phone', 'nullable', 'string', 'max:255'],
            'consent_given' => ['required', 'accepted'],
        ], [
            'consent_given.required' => 'Vous devez accepter les conditions de confidentialité.',
            'consent_given.accepted' => 'Vous devez accepter les conditions de confidentialité.',
        ]);

        $aideRequest = AideRequest::create([
            'name' => $validated['name'],
            'region' => $validated['region'],
            'type_of_violence' => $validated['type_of_violence'],
            'description' => $validated['description'],
            'contact_method' => $validated['contact_method'],
            'contact_value' => $validated['contact_value'] ?? null,
            'consent_given' => true,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'status' => 'pending',
        ]);

        // Send email notification to staff
        $this->sendNotificationEmail($aideRequest);

        return redirect()->route('aide.formulaire')
            ->with([
                'success' => 'Votre demande a ete enregistree avec succes. Nous vous contacterons bientot.',
                'saved_request' => [
                    'id' => $aideRequest->id,
                    'status' => $aideRequest->status,
                    'region' => $aideRequest->region,
                    'contact_method' => $aideRequest->contact_method,
                    'submitted_at' => $aideRequest->created_at?->toIso8601String(),
                ],
            ]);
    }

    /**
     * Send email notification to ISRAR staff
     */
    private function sendNotificationEmail(AideRequest $aideRequest): void
    {
        $adminEmail = config('mail.admin_email', config('mail.from.address'));
        
        Mail::raw(
            "Nouvelle demande d'aide reçue\n\n" .
            "ID: {$aideRequest->id}\n" .
            "Région: {$aideRequest->region}\n" .
            "Type de violence: {$aideRequest->type_of_violence}\n" .
            "Méthode de contact: {$aideRequest->contact_method}\n" .
            "Date: {$aideRequest->created_at->format('d/m/Y H:i')}\n\n" .
            "Voir les détails dans l'administration.",
            function ($message) use ($adminEmail, $aideRequest) {
                $message->to($adminEmail)
                    ->subject("Nouvelle demande d'aide - #{$aideRequest->id}");
            }
        );
    }
}
