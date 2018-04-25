export declare type Listener = () => void;
export declare class Delegate {
    private listeners;
    fire(): void;
    subscribe(fn: Listener): void;
    unsubscribe(fn: Listener): void;
}
