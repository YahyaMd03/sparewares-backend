const mongoose = require('mongoose')

const FinancialYear = new mongoose.Schema({
    start:{
        type:String,
        required:true
    },
    end:{
        type:String,
        required:true 
    },
    format:{
        type:String,
    },
    status:{
        type:Boolean,
        default:false
    },
    is_deleted:{
        type:Boolean,
        default:false,        
    }
},
{timeStamp:true}
)
FinancialYear.pre('save', function (next) {
    const startYear = this.start.toString().substring(2);
    const endYear = this.end.toString().substring(2);
    this.format = startYear + "TO" + endYear;
    next();
});
module.exports = mongoose.model('tbl_financial_year',FinancialYear)