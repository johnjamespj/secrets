interface EventTargetExtended extends EventTarget {
    key: {
        value: string;
    };
}

interface AskKeySubmitData {
    key: string;
}

type AskKeyOnSubmitCallback = (x: AskKeySubmitData) => void;

interface AskKeyProps {
    onSubmit: AskKeyOnSubmitCallback
}

export function _AskKey({
    onSubmit
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
        <button>unencrypt</button>
    </form>;
}

export function AskKey(){
    return <div />
}