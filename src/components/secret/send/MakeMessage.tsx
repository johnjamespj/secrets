interface EventTargetExtended extends EventTarget {
    key: {
        value: string;
    };
    message: {
        value: string;
    };
    vanishMode: {
        checked: boolean;
    };
}

interface MakeMessageSubmitData {
    key: string;
    message: string;
    vanishMode: boolean;
}

export type MakeMessageOnSubmitCallback = (x: MakeMessageSubmitData) => void;

interface MakeMessageProps {
    onSubmit: MakeMessageOnSubmitCallback
}

export function MakeMessage({
    onSubmit
}: MakeMessageProps) {
    const handleSubmit = (e: React.FormEvent) => {
        if (e.target)
            onSubmit({
                key: (e.target as EventTargetExtended).key.value,
                message: (e.target as EventTargetExtended).message.value,
                vanishMode: (e.target as EventTargetExtended).vanishMode.checked
            });
        e.preventDefault();
    };

    return <form onSubmit={handleSubmit}>
        <input name="key" type="text" placeholder="key" required /><br />
        <textarea name="message" placeholder="Message" required /><br />
        <input type="checkbox" id="vanishMode" name="vanishMode" value="vanishMode" />
        <label htmlFor="vanishMode">Vanish Mode</label><br />
        <button>Send</button>
    </form>;
}