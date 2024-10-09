import createError from 'http-errors'

// export const badRequest = (err, res) =>{
//     const error = createError.BadRequest(err)
//     return res.status(error.status).json({
//         err: 1,
//         mes: error.message
//     })
// }


export const badRequest = (err, res) => {
    // Kiểm tra xem biến err có tồn tại và có giá trị không
    if (err && err.status) {
        // Trả về lỗi BadRequest với mã lỗi và thông báo lỗi từ đối tượng lỗi
        return res.status(err.status).json({
            err: 1,
            mes: err.message
        });
    } else {
        // Nếu biến err không tồn tại hoặc không có giá trị, trả về lỗi BadRequest mặc định
        const error = createError.BadRequest(err);
        return res.status(error.status).json({
            err: 1,
            mes: error.message
        });
    }
}


export const internalSeverError = (res) =>{
    const error = createError.InternalServerError()
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}

export const notFound = (req, res) =>{
    const error = createError.NotFound('This route is not define')
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}

export const notAuth = (err, res) =>{
    const error = createError.Unauthorized(err)
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}