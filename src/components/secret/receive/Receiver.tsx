import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { StateType } from '../../store';
import { decryptMessage } from '../action';
import { SecretState } from '../reducer';
import { AskKey, AskKeyOnSubmitCallback } from "./AskKey";

export function Receiver() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const secret = useSelector<StateType, SecretState>(state => state.secret)
    const navigate = useNavigate()

    const handleSubmit: AskKeyOnSubmitCallback = (e) => {
        dispatch(decryptMessage(e.key, id))
        navigate('./message')
    }

    return <AskKey onSubmit={handleSubmit} error={secret.error !== null} />
}