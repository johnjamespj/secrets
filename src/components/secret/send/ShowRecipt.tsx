import { useSelector } from "react-redux"
import { StateType } from "../../store"
import { SecretState } from "../reducer"

interface ShowReciptProps {
    path: string;
}

function Loading() {
    return <div>loading..</div>
}

export function _ShowRecipt({
    path
}: ShowReciptProps) {
    const processedPath = window.location.protocol
        .concat("//")
        .concat(window.location.host)
        .concat('/secret/')
        .concat(path);

    return <div>
        <a href={processedPath}>{processedPath}</a>
        <p>Share the key and url with the recipient and once they decrypt and read
            message once the message deletes itself automatically</p>
    </div>
}

export function ShowRecipt() {
    const secret = useSelector<StateType, SecretState>(state => state.secret)
    return secret.loading ? <Loading /> : <_ShowRecipt path={secret.id || ""} />
}