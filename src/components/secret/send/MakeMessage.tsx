import { TextField, Checkbox, makeStyles, Theme, createStyles, Button, FormLabel, CardActions } from "@material-ui/core";
import { useState } from "react";
import { Container } from "../../Container";
import { isNotEmptyString } from "../../util";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            gap: 15,
            height: '100%'
        },
        spacer: {
            flex: 1
        },
        vanishCheckbox: {
            display: 'flex',
            alignItems: 'center'
        },
        button: {
            display: 'flex',
            justifyContent: 'flex-end'
        }
    }),
);

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
    const classes = useStyles()
    const [key, setKey] = useState("")
    const [message, setMessage] = useState("")
    const [vanishMode, setVanishMode] = useState(false)

    const handleSubmit = (e?: React.FormEvent) => {
        if (isNotEmptyString(key) && isNotEmptyString(message))
            onSubmit({
                key,
                message,
                vanishMode
            });
            e && e.preventDefault();
    };

    return <Container>
        <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
                name="key"
                type="text"
                label="Key"
                variant="outlined"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter')
                        handleSubmit(e);
                }}
                required
                fullWidth
            />
            <TextField
                name="message"
                label="Message"
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
                multiline
                fullWidth
            />
            <div className={classes.vanishCheckbox}>
                <Checkbox
                    id="vanishMode"
                    name="vanishMode"
                    value={vanishMode}
                    onChange={(e) => setVanishMode(e.target.checked)}
                />
                <FormLabel htmlFor="vanishMode">Vanish Mode</FormLabel>
            </div>
            <div className={classes.spacer} />
            <CardActions className={classes.button}>
                <Button onClick={handleSubmit} variant="contained" color="primary">Send</Button>
            </CardActions>
        </form>
    </Container>;
}