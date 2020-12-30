interface EventTargetExtended extends EventTarget {
    key: {
        value: string;
    };
    message: {
        value: string;
    };
}

interface MakeMessageSubmitData {
    key: string;
    message: string;
}

type MakeMessageOnSubmitCallback = (x: MakeMessageSubmitData) => void;

interface MakeMessageProps {
    onSubmit: MakeMessageOnSubmitCallback
}

export function _MakeMessage({
    onSubmit
}: MakeMessageProps) {
    const handleSubmit = (e: React.FormEvent) => {
        if (e.target)
            onSubmit({
                key: (e.target as EventTargetExtended).key.value,
                message: (e.target as EventTargetExtended).message.value
            });
        e.preventDefault();
    };

    return <form onSubmit={handleSubmit}>
        <input name="key" type="text" placeholder="key" required /><br />
        <textarea name="message" placeholder="Message" required /><br />
        <button>Send</button>
    </form>;
}

export function MakeMessage(){
    return <div />
}