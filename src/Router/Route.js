const express =require('express')
const app=express()
const router =express.Router()
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const FormControler =require('../Controller/FormController')


router.get('/bg',(req,res)=>{
    res.send({status:true, msg:"Connected successfully!!!!"})
})




// Set up Multer storage
const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, 'uploads/') // save files to the 'uploads' directory
    // },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // use the original filename
    }
});

const upload = multer({ storage: storage });



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


router.post('/form', FormControler.FormData)

router.post('/submit', upload.single('file'), FormControler.CareerData)



module.exports=router