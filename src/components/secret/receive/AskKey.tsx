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

interface EventTargetExtended extends EventTarget {
    key: {
        value: string;
    };
}

interface AskKeySubmitData {
    key: string;
}

export type AskKeyOnSubmitCallback = (x: AskKeySubmitData) => void;

interface AskKeyProps {
    onSubmit: AskKeyOnSubmitCallback;
    error: boolean;
}

export function AskKey({
    onSubmit,
    error
}: AskKeyProps) {
    const classes = useStyles()
    const [key, setKey] = useState("")

    const handleSubmit = (e?: React.FormEvent) => {
        if (isNotEmptyString(key))
            onSubmit({
                key,
            });

        e && e.preventDefault()
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
                error={error}
                helperText={error ? "Either the message does not exist, the key is invalid or the message is expired." 
                                : "Enter the given key to decrypt the message."}
            />
            <div className={classes.spacer} />
            <CardActions className={classes.button}>
                <Button onClick={handleSubmit} variant="contained" color="primary">decrypt</Button>
            </CardActions>
        </form>
    </Container>;
}