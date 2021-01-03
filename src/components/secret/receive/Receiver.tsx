import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { Loader } from '../../Loader';
import { StateType } from '../../store';
import { isNotEmptyString } from '../../util';
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
    }

    useEffect(() => {
        if (isNotEmptyString(secret.id) && !secret.loading && secret.error === null)
            navigate('./message')
    }, [secret])

    return <div>
        {secret?.loading && <Loader />}
        <AskKey onSubmit={handleSubmit} error={secret.error !== null} />
    </div>
}