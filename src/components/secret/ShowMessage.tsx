interface ShowMessageProps{
    message: string;
}

export function _ShowMessage({
    message
}: ShowMessageProps) {
  return <div>{message}</div>;
}

export function ShowMessage(){
  return <div />
}