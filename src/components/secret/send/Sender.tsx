import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MakeMessage, MakeMessageOnSubmitCallback } from './MakeMessage'
import { encryptMessage } from '../action'

export function Sender() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit: MakeMessageOnSubmitCallback = (e) => {
        dispatch(encryptMessage(e.key, e.message, e.vanishMode))
        navigate('./recipt')
    }

    return (
        <MakeMessage
            onSubmit={handleSubmit}
        />
    )
}