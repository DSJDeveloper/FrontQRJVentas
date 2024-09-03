export function getURLApi() {
    if (import.meta.env.VITE_API_URL == undefined) {
        throw new Error('No se ha definido la URL de la API')
    } else if (import.meta.env.VITE_API_URL.length <= 0) {
        throw new Error('No se ha definido la URL de la API')
    }

    if(import.meta.env.VITE_API_URL.endsWith("/")){
        return import.meta.env.VITE_API_URL
    }else{
        return import.meta.env.VITE_API_URL
    }
    
}
export function getTokenAuthorization():string {

    if (import.meta.env.VITE_API_TOKEN == undefined) {
        throw new Error('No se ha definido el token de autorización para la aplicación')
    } else if (import.meta.env.VITE_API_TOKEN.length <= 0) {
        throw new Error('No se ha definido el token de autorización para la aplicación')
    }

   return import.meta.env.VITE_API_TOKEN
}