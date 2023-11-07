import { create } from 'zustand'

const useImageStore = create((set) => ({
    server: 0,
    id: 0,
    secret: 0,
    title: '',
    setImage: (server, id, secret, title) => {
        set({server: server}),
        set({id: id}),
        set({secret: secret}),
        set({title: title}),
        console.log(server, id, secret)
    }
    
}))

export default useImageStore;