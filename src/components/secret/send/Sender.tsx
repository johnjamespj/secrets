import { useSelector } from 'react-redux'
import { StateType } from '../../store'
import { SecretState } from '../reducer'

export function Sender() {
    const secret = useSelector<StateType, SecretState>(state => state.secret)
    return <div />
}