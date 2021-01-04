import { useState } from "react";
import { useParams } from "react-router";
import { Channel } from "./channel";

type ChannelCreatorCallback = (id: string) => void;
type ChannelClickCallback = (pos: number) => void;

interface ChannelListProps {
    channels: Channel[];
    onAddChannel: ChannelCreatorCallback;
    onClickChannel: ChannelClickCallback;
}

export function ChannelList({
    channels,
    onAddChannel,
    onClickChannel,
}: ChannelListProps) {
    const [newChannelID, setID] = useState<null | string>(null)
    const { id } = useParams();

    const handleCreateChannel = () => {
        onAddChannel(newChannelID || "")
        setID(null)
    }

    const handleAddClick = () => {
        setID("")
    }

    const handleChannelToggle = (pos: number) => (e: React.MouseEvent) => {
        onClickChannel(pos)
        e.preventDefault()
    }

    return <div>
        <ul>
            {channels.map((x, i) => <li key={i}>
                <a href={"./" + x.id} onClick={handleChannelToggle(i)}>{x.name}</a>
            </li>)}
        </ul>
        {newChannelID === null
            ? <button onClick={handleAddClick}>Add Channel</button>
            : <input
                type="text"
                value={newChannelID || ""}
                onChange={(e) => setID(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter')
                        handleCreateChannel();
                }}
            />}
    </div>
}