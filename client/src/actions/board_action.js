import axios from 'axios'

export function writeBoard(dataSubmit, config) {
    const request = axios.post(`/api/board/${config.name}/write`, dataSubmit)
        .then(response => response.data)
    return {
        type: 'write_board',
        payload: request
    }
}

export function galleryWriteBoard(dataSubmit, config) {
    const request = axios.post(`/api/board/${config.name}/galleryWrite`, dataSubmit, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .then(response => response.data)
    return {
        type: 'galleryWrite_board',
        payload: request
    }
}

export function listBoard(dataSubmit, config) {
    const request = axios.get(`/api/board/list/${config.type}/${config.name}/${config.page}`, dataSubmit)
        .then(response => response.data)
    return {
        type: 'list_board',
        payload: request
    }
}

export function lookContent(dataSubmit, config) {
    const request = axios.post(`/api/board/list/${config.name}/contents/${config.no}`, dataSubmit)
        .then(response => response.data)
    return {
        type: 'look_content',
        payload: request
    }
}

export function modify(dataSubmit, config) {
    const request = axios.post(`/api/board/list/${config.name}/modify/${config.no}`, dataSubmit)
        .then(request => request.data)
    return {
        type: 'modify_board',
        payload: request
    }
}

export function deleteContent(dataSubmit, config) {
    const request = axios.post(`/api/board/list/${config.name}/delete/${config.no}`, dataSubmit)
        .then(request => request.data)
    return {
        type: 'delete_board',
        payload: request
    }
}