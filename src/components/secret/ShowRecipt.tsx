interface ShowReciptProps {
    secretKey: string;
    path: string;
}

export function _ShowRecipt({
    secretKey,
    path
}: ShowReciptProps) {
    return <div>
        <p>{secretKey}</p>
        <p>{window.location.href + path}</p>
        <p>Share the key and url with the recipient and once they decrypt and read 
            message once the message deletes itself automatically</p>
    </div>
}

export function ShowRecipt(){
    return <div />
}