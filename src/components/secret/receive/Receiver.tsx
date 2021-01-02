import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { decryptMessage } from '../action';
import { AskKey, AskKeyOnSubmitCallback } from "./AskKey";

export function Receiver() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit: AskKeyOnSubmitCallback = (e) => {
        dispatch(decryptMessage(e.key, id))
        navigate('./message')
    }

    return <AskKey onSubmit={handleSubmit} />
}