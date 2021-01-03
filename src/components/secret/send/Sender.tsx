
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MakeMessage, MakeMessageOnSubmitCallback } from './MakeMessage'
import { encryptMessage, resetSecretData } from '../action'
import { StateType } from '../../store'
import { SecretState } from '../reducer'
import { useEffect } from 'react'
import { isNotEmptyString } from '../../util'
import { Loader } from '../../Loader'

export function Sender() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const secret = useSelector<StateType, SecretState>(state => state.secret)

    const handleSubmit: MakeMessageOnSubmitCallback = (e) => {
        dispatch(encryptMessage(e.key, e.message, e.vanishMode))
    }

    useEffect(() => {
        if (isNotEmptyString(secret.message) && isNotEmptyString(secret.id) && !secret.loading && secret.error === null)
            navigate('./recipt')
    }, [secret])

    return (
        <div>
            {secret?.loading && <Loader />}
            <MakeMessage
                onSubmit={handleSubmit}
            />
        </div>
    )
}