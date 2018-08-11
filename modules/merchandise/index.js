let service = require('./merchandise-service');
var multer      = require('multer');
var upload      = multer({ dest: '../../utils/upload',fileFilter:function(req,file,cb){
        //console.log('file is',file)
        cb(null,true);
    }
});

module.exports = function (app) {
   
    // APIs for Merchandise Management
    
    // To get list of merchandise details
    app.get('/merchandise/getmerchandises', service.getMerchandiseLists);

    // To add new merchandise
    app.post('/merchandise/addmerchandise',upload.any(), service.addMerchandise);

    // To update merchandise details 
    app.put('/merchandise/updatemerchandise',upload.any(), service.updateMerchandise);

    // To map category to merchandise
    app.put('/merchandise/mapcategory', service.mapCategory);

}