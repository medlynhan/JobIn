
"use client";

import React, { useState } from 'react';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

// Read from public env vars so they are available on the client.
// Make sure to set these in your .env.local file as:
// NEXT_PUBLIC_AZURE_SPEECH_KEY=your_key
// NEXT_PUBLIC_AZURE_SPEECH_REGION=your_region (e.g., eastus)
const SPEECH_KEY = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
const SPEECH_REGION = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;

type ListeningStatus = 'idle' | 'listening' | 'recognized' | 'error';

const VoiceListener: React.FC = () => {
    const [recognizedText, setRecognizedText] = useState<string>('');
    const [status, setStatus] = useState<ListeningStatus>('idle');

    const handleListen = async () => {
        // Validate config early
        if (!SPEECH_KEY || !SPEECH_REGION) {
            setStatus('error');
            setRecognizedText('Speech configuration missing. Please set NEXT_PUBLIC_AZURE_SPEECH_KEY and NEXT_PUBLIC_AZURE_SPEECH_REGION in your .env.local.');
            console.error('Missing Azure Speech env vars.');
            return;
        }

        setStatus('listening');
        setRecognizedText('');

        const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(SPEECH_KEY, SPEECH_REGION);
        speechConfig.speechRecognitionLanguage = 'id-ID'; // Or 'id-ID' for Indonesian

        const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognizeOnceAsync(result => {
            if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
                const text = result.text;
                setRecognizedText(text);
                setStatus('recognized');
                console.log(`RECOGNIZED: Text=${text}`);
                
                // --- NEXT STEP ---
                // Here is where you will send the `text` to your backend API
                // sendToBackend(text); 
            } else {
                const errorMessage = `ERROR: Speech could not be recognized. Reason: ${result.reason}`;
                console.error(errorMessage);
                setRecognizedText('Sorry, I could not understand. Please try again.');
                setStatus('error');
            }
            recognizer.close();
        });
    };

    return (
        <div>
            <button onClick={handleListen} disabled={status === 'listening'}>
                {status === 'listening' ? 'Listening...' : '🎤 Start Listening'}
            </button>

            {status !== 'idle' && (
                <div style={{ marginTop: '20px' }}>
                    <p><strong>Status:</strong> {status}</p>
                    <p><strong>You said:</strong> {recognizedText}</p>
                </div>
            )}
        </div>
    );
};

export default VoiceListener;