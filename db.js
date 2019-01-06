const Sequelize=require('sequelize')

var db;
if(process.env.DATABASE_URL){
db=new Sequelize(process.env.DATABASE_URL,{
    dialect:'postgres',
    protocol:'postgres',
    logging:false
})
}
else{
db=new Sequelize('servicerequests','servicerequests','servicerequests',{
    host:'localhost',
    dialect:'mysql',
    pool:{
        max:5,
        min:5
    },
   
})
}
const serviceproviders=db.define('serviceproviders',{
    organizationid:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
        
        
    },
    serviceprovided:{
        type:Sequelize.STRING
    },
    description:{
        type:Sequelize.TEXT
    },
    Name:{
        type:Sequelize.STRING
    },
    password:{
       type:Sequelize.STRING 
    }
    
})
const customers=db.define('customers',{
    email:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    },
    customerid:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
        
    }

})

const requests=db.define('requests',{
    requestid:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
        
    },
    organizationid:{
        type:Sequelize.INTEGER
    },
    customerid:{
        type:Sequelize.INTEGER
    },
    status:{
        type:Sequelize.STRING
    }

})

db.sync()
.then(()=>{
    console.log("synced successfully")
})

exports=module.exports={
    serviceproviders,customers,requests
}