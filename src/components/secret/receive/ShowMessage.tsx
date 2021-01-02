import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { StateType } from "../../store";
import { SecretState } from "../reducer";

function Loading() {
  return <div>loading..</div>
}

interface ShowMessageProps {
  message: string;
}

export function _ShowMessage({
  message
}: ShowMessageProps) {
  return <div>{message}</div>;
}

export function ShowMessage() {
  const secret = useSelector<StateType, SecretState>(state => state.secret)
  const navigate = useNavigate()

  useEffect(() => {
    if (secret.error !== null)
      navigate('../')
  }, [secret])

  return secret.loading ? <Loading /> : (
    secret.error === null ? <_ShowMessage message={secret.message || ""} /> : <div />
  )
}