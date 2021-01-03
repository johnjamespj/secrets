import { LinearProgress, createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyle = makeStyles((theme: Theme) => createStyles({
    root: {
        position: 'fixed',
        width: '100vw',
        top: 0,
        left: 0
    },
}))

export function Loader() {
    const classes = useStyle()
    return <div className={classes.root}>
        <LinearProgress />
    </div>
}