import request from '@/utils/request'

// 上传文件
export function upload(file) {
    // const formData = new FormData();
    // formData.append("file", file);

    return request({
        url: '/user/file',
        method: 'post',
        data: file,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

// 删除
export function deleteFile(query) {
    return request({
        url: '/user/file',
        method: 'delete',
        params: query
    })
}