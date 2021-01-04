import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Channel } from "./channel";
import { ChannelList } from "./ChannelList";

export function Chat() {
    const [channels, setChannels] = useState<Channel[]>([])
    const [selectedChannel, selectChannel] = useState<Channel | null>(null)
    const navigate = useNavigate()

    const handleChannelAdd = (str: string) => {
        setChannels(x => [...x, {
            id: str,
            name: str,
        }])
    }

    const handleChannelToggle = (pos: number) => {
        selectChannel(channels[pos])
    }

    useEffect(() => {
        if (selectedChannel !== null)
            navigate('/chat/' + selectedChannel.id)
    }, [selectedChannel])

    useEffect(() => {
        if (channels.length !== 0)
            handleChannelToggle(channels.length - 1)
    }, [channels])

    return <div>
        <ChannelList
            channels={channels}
            onAddChannel={handleChannelAdd}
            onClickChannel={handleChannelToggle}
        />
    </div>
}