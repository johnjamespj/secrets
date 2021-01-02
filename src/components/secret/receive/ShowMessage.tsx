import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { StateType } from "../../store";
import { SecretState } from "../reducer";

function Loading() {
  return <div>loading..</div>
}

interface ShowMessageProps {
  message: string;
  views?: number | null;
}

export function ShowMessageUI({
  message,
  views = 0
}: ShowMessageProps) {
  return <div>
    <div>{message}</div>
    {views && <div>Views: {views}</div>}
  </div>;
}

export function ShowMessage() {
  const secret = useSelector<StateType, SecretState>(state => state.secret)
  const navigate = useNavigate()

  useEffect(() => {
    if (secret.error !== null || (secret.message === null && !secret.loading))
      navigate('../')
  }, [secret])

  return secret.loading ? <Loading /> : (
    secret.error === null ? <ShowMessageUI message={secret.message || ""} views={secret.views} /> : <div />
  )
}