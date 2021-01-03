import { useNavigate, useBlocker } from 'react-router-dom'
import { Typography, Link, Tooltip, Card, makeStyles, Theme, createStyles, } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Container } from "../../Container";
import { copyTextToClipboard } from "../../util";
import { SecretState } from "../reducer"
import { isNotEmptyString } from '../../util'
import { StateType } from '../../store'
import { resetSecretData } from '../action';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            cursor: 'pointer',
            display: 'grid',
            placeContent: 'center',
            margin: theme.spacing(1),
        },
    }),
);

interface ShowReciptProps {
    path: string;
}

function Loading() {
    return <div>loading..</div>
}

export function ShowReciptUI({
    path
}: ShowReciptProps) {
    const [isBlocked, setBlocked] = useState(true)
    const dispatch = useDispatch()
    const classes = useStyles()
    const secret = useSelector<StateType, SecretState>(state => state.secret)
    const navigate = useNavigate()
    const processedPath = window.location.protocol
        .concat("//")
        .concat(window.location.host)
        .concat('/secret/')
        .concat(path);

    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        copyTextToClipboard(processedPath)
        setCopied(true)
    }

    useBlocker(() => {
        dispatch(resetSecretData())
        setBlocked(false)
    }, isBlocked)

    useEffect(() => {
        if (!isNotEmptyString(secret.message) && !isNotEmptyString(secret.id))
            navigate('../')
    }, [secret])

    return <Container>
        <Typography variant="caption" gutterBottom>Share the key and url with the recipient and once they decrypt and read
            message once the message deletes itself automatically</Typography><br />
        <Tooltip title="Click to Copy">
            <Card className={classes.box} elevation={0} variant="outlined">
                <Link onClick={handleCopy}>
                    <Typography variant="caption" >
                        {processedPath}
                    </Typography>
                </Link>
            </Card>
        </Tooltip>
        {copied && <Alert severity="success">Copied</Alert>}
    </Container>
}

export function ShowRecipt() {
    const secret = useSelector<StateType, SecretState>(state => state.secret)
    return <ShowReciptUI path={secret.id || ""} />
}