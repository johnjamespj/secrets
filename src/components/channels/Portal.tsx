import { Message } from "./channel";

interface PortalProps {
    messages: Message[];
}

export function Portal({
    messages
}: PortalProps) {
    return <div>
        <ul>
            {messages.map((x, i) => <li key={i}>
                <p>{x.user}</p>
                <span>{x.message}</span>
                <span>{x.timestamp.toISOString()}</span>
            </li>)}
        </ul>
    </div>
}