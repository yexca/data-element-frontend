import request from '@/utils/request'

// 上传文件
export function upload(file) {
    // const formData = new FormData();
    // formData.append("file", file);

    return request({
        url: '/admin/common/upload',
        method: 'post',
        data: file,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}