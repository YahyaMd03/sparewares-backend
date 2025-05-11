const multer = require('multer');
const multerS3 = require('multer-s3');
const { s3 } = require('../utils/aw-config');

const uploadToS3 = (bucketName) => {
    return multer({
        storage: multerS3({
            s3: s3,
            bucket: bucketName,
            metadata: (req, file, cb) => {
                cb(null, { fieldName: file.fieldname });
            },
            key: (req, file, cb) => {
                cb(null, Date.now().toString() + '_' + file.originalname);
            }
        })
    });
};


const deleteFromS3 = (bucketName, key) => {
    const params = {
        Bucket: bucketName,
        Key: key
    }

    return s3.deleteObject(params).promise()
}

module.exports = { uploadToS3, deleteFromS3 };