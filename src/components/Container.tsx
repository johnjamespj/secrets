import { Card, createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyle = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'grid',
        placeContent: 'center',
        height: 'max(100vh, 400px)'
    },
    card: {
        width: 'min(320px , 100vw)',
        height: 360,
        padding: theme.spacing(2),
        margin: theme.spacing(2)
    }
}))

interface ContainerProps {
    children: React.ReactNode
}

export function Container({
    children
}: ContainerProps) {
    const classes = useStyle()
    return <div className={classes.root}>
        <Card className={classes.card}>{children}</Card>
    </div>
}