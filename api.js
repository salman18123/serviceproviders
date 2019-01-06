const route=require('express').Router()
const serviceproviders=require('./db').serviceproviders
const customers=require('./db').customers
const requests=require('./db').requests


route.post('/addservice',(req,res)=>{
    serviceproviders.create(req.body)
    .then((service)=>{
        res.send({service:service,message:'success'})
    })
    .catch((err)=>{
        res.send({error:err})
    })
})
route.post('/addcustomer',(req,res)=>{
    customers.create(req.body)
    .then((customer)=>{
        res.send({customer:customer,message:'success'})
    })
    .catch((err)=>{
        res.send({error:err})
    })
})
route.post('/getcustomer',(req,res)=>{
    
    customers.findOne({
        where:{
            email:req.body.email,
            password:req.body.password
            
        }
    })
    .then((customer)=>{
        res.send({customer:customer,message:'success'})
    })
    .catch((err)=>{
        res.send({error:err})
    })
})
route.post('/getprovider',(req,res)=>{
    
    serviceproviders.findOne({
        where:{
            Name:req.body.Name,
            password:req.body.password
            
        }
    })
    .then((serviceprovider)=>{
        res.send({serviceprovider:serviceprovider,message:'success'})
    })
    .catch((err)=>{
        res.send({error:err})
    })
})
route.get('/customer/:customerid',(req,res)=>{
    customers.findById(req.params.customerid)
    .then((customer)=>{
        res.send({customer:customer,message:'success'})
    })
    .catch((err)=>{
        res.send({error:err})
    })
})
route.get('/serviceprovider/:organizationid',(req,res)=>{
    serviceproviders.findById(req.params.organizationid)
    .then((provider)=>{
        res.send({provider:provider,message:'success'})
    })
    .catch((err)=>{
        res.send({error:err})
    })
})
route.post('/createrequest',(req,res)=>{
    requests.create(req.body)
    .then((request)=>{
        res.send({request:request,message:'success'})
    })
    .catch((err)=>{
        res.send({error:err})
    })
})

route.put('/updaterequest/:requestid/:statustype',(req,res)=>{
    
  requests.update({
   status:req.params.statustype
  },{
      where:{
       requestid:req.params.requestid
      }
  })
  .then((request)=>{
      res.send({request:request,message:'success'})
  })
  .catch((err)=>{
      res.send({error:err})
  })

})
route.post('/getrequests',(req,res)=>{
requests.findAll({
    where:{
        organizationid:req.body.organizationid,
        status:req.body.status
    }
})
.then((requests)=>{
    res.send({requests:requests,message:'success'})
})
.catch((err)=>{
    console.log(err)
})
})
route.get('/getrequests/:customerid',(req,res)=>{
    requests.findAll({
        where:{
            customerid:req.params.customerid
        }
    })
    .then((requests)=>{
      res.send({requests:requests,message:'success'})
    })
    .catch((err)=>{
        res.send({error:err})
    })
})
route.get('/getallproviders',(req,res)=>{
    serviceproviders.findAll()
    .then((services)=>{
       res.send({services:services,message:'success'})
    })
    .catch((err)=>{
        res.send({error:err})
    })
})
exports=module.exports=route