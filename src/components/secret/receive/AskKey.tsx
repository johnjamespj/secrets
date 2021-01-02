interface EventTargetExtended extends EventTarget {
    key: {
        value: string;
    };
}

interface AskKeySubmitData {
    key: string;
}

export type AskKeyOnSubmitCallback = (x: AskKeySubmitData) => void;

interface AskKeyProps {
    onSubmit: AskKeyOnSubmitCallback;
    error?: boolean;
}

export function AskKey({
    onSubmit,
    error = false
}: AskKeyProps) {
    const handleSubmit = (e: React.FormEvent) => {
        if (e.target)
            onSubmit({
                key: (e.target as EventTargetExtended).key.value,
            });
        e.preventDefault();
    };

    return <form onSubmit={handleSubmit}>
        <input name="key" type="text" placeholder="key" /><br />
        {error && <div style={{ color: 'red' }}>Invalid key or text vanished</div>}
        <button>unencrypt</button>
    </form>;
}