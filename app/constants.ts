const apiBaseUrl = '/api'
const apiVersion = '1'
const apiBase = `${apiBaseUrl}/v${apiVersion}/`

export const apiUrl = {
    parameter: `${apiBase}parameters`,
    section: `${apiBase}sections`,
    content: `${apiBase}contents`
}


export const parameterTypes = {
    'string': 'Text',
    'enum': 'Výčet položek'
}