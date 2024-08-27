/// <reference types="vite/client" />

declare global {
    interface Window {
        _player?: HTMLAudioElement
    }
}

export {}