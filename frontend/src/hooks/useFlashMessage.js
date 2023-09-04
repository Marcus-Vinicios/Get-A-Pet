import bus from '../utils/bus'

export default function useFlashMessage() {
    const setFlashMessage = (msg, type) => {
        bus.emit('flash', {
            message: msg,
            type: type,
        })
    }

    return { setFlashMessage }
}