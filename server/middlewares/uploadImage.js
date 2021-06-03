const fs =require('fs')

const uploadImage = async (req,res,next) => {
    try {
        // xét về kích cỡ, định dạng, !file != null
        if(!req.files || !Object.keys(req.files).length === 0){
            return res.status(400).json({message: "Không có file nào cả!"})
        }// Object.key là thuộc tính đếm trong object
        
        const file = req.files.file
        if(file.size > 1024*1024 ){
            removeTmp(file.tempFilePath)
            return res.status(400).json({message: "Kích cỡ file quá lớn"})           
        }// 1MB

        if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png" ){
            removeTmp(file.tempFilePath)
            return res.status(400).json({message: "Định dạng file không đúng"})
        }
        next()
    } catch (err) {
        next(err)
    }
}

const removeTmp =(path) =>{
    fs.unlink(path,err =>{
        if(err) throw err
    })
}//unlink(path, callback) xóa file

module.exports = uploadImage