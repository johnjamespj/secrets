import { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles, Card, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Scrollbars } from 'react-custom-scrollbars';
import { useNavigate, useBlocker } from "react-router";
import { Container } from "../../Container";
import { StateType } from "../../store";
import { SecretState } from "../reducer";
import { resetSecretData } from "../action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: 15,
      height: '100%'
    },
    message: {
      flex: 1,
      padding: theme.spacing(2),
    }
  }),
);

interface ShowMessageProps {
  message: string;
  views?: number | null;
}

export function ShowMessageUI({
  message,
  views = 0
}: ShowMessageProps) {
  const classes = useStyles()

  return <Container>
    <div className={classes.root}>
      <Card className={classes.message} elevation={0} variant="outlined">
        <Scrollbars autoHide>
          <Typography variant="body1">
            {message}
          </Typography>
        </Scrollbars>
      </Card>
      {views && <Typography variant="subtitle1">Views: {views}</Typography>}
    </div>
  </Container>;
}

export function ShowMessage() {
  const [isBlocked, setBlocked] = useState(true)
  const secret = useSelector<StateType, SecretState>(state => state.secret)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useBlocker(() => {
    dispatch(resetSecretData())
    setBlocked(false)
  }, isBlocked)

  useEffect(() => {
    if (secret.error !== null || (secret.message === null && !secret.loading))
      navigate('../')
  }, [secret])

  return secret.error === null ? <ShowMessageUI message={secret.message || ""} views={secret.views} /> : <div />
}