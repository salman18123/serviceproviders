var myapp=angular.module('servicesapp',['ngRoute','ngStorage'])
myapp.controller('logincontroller',['$location','$http','$rootScope','$window','$sessionStorage',function($location,$http,$rootScope,$window,$sessionStorage){
    var main=this;
    this.customerregistrationpage=function(){
        $location.path('/customerregistration')
    }
    this.serviceproviderregistrationpage=function(){
        $location.path('/serviceproviderregistration')
    }

}])
myapp.controller('customerregistrationcontroller',['$location','$http','$rootScope','$window','$sessionStorage',function($location,$http,$rootScope,$window,$sessionStorage){
    var main=this
    this.clicking=function(){
        var mydata={
            email:main.email,
            password:main.password
        }
        $http.post('/api/addcustomer',mydata)
        .then((response)=>{
            console.log(response)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    this.loggingin=function(){
        $location.path('/customerlogin')
    }

}])
myapp.controller('serviceproviderregistrationcontroller',['$location','$http','$rootScope','$window','$sessionStorage',function($location,$http,$rootScope,$window,$sessionStorage){
    var main=this
    this.clicking=function(){
        var mydata={
            Name:main.name,
            password:main.password,
            description:main.description,
            serviceprovided:main.serviceprovided
        }
        $http.post('/api/addservice',mydata)
        .then((response)=>{
            console.log(response)
        })

    }
    this.loggingin=function(){
        $location.path('/serviceproviderlogin')

    }

}])
myapp.controller('customerlogincontroller',['$location','$http','$rootScope','$window','$sessionStorage',function($location,$http,$rootScope,$window,$sessionStorage){
    var main=this
    this.clicking=function(){
        var mydata={
            email:main.email,
            password:main.password
        }
        console.log(mydata)
        $http.post('/api/getcustomer',mydata)
        .then((response)=>{
            if(response.data.customer!=null){
                $location.path('/customer/'+response.data.customer.customerid)
            }
        })
    }

}])
myapp.controller('serviceproviderlogincontroller',['$location','$http','$rootScope','$window','$sessionStorage',function($location,$http,$rootScope,$window,$sessionStorage){
    var main=this
    this.clicking=function(){
        var mydata={
            Name:main.name,
            password:main.password
        }
        console.log(mydata)
        $http.post('/api/getprovider',mydata)
        .then((response)=>{
            console.log(response)
            if(response.data.serviceprovider!=null){
               $location.path('/serviceprovider/'+response.data.serviceprovider.organizationid)
               
            }
        })
    }

}])
myapp.controller('customerviewcontroller',['$location','$http','$rootScope','$routeParams','$window','$sessionStorage',function($location,$http,$rootScope,$routeParams,$window,$sessionStorage){
    var main=this
    this.customerid=$routeParams.customerid
    this.customerinfo=""
    this.serviceprovidersinfo=""
    this.getinfo=function(){
       
        $http.get('/api/customer/'+main.customerid)
        .then((response)=>{
            
            main.customerinfo=response.data.customer
            console.log(main.customerinfo)
        })
        .catch((err)=>{
            console.log(err)
        })
        $http.get('/api/getallproviders')
        .then((response)=>{
        main.serviceprovidersinfo=response.data.services
        console.log(main.serviceprovidersinfo)
        })
    }
    this.getinfo()

    this.makingrequest=function(organizationid){
        var mydata={
            organizationid:organizationid,
            customerid:main.customerinfo.customerid,
            status:'new'
        }
        $http.post('/api/createrequest',mydata)
        .then((response)=>{
            console.log(response)
        })
        .catch((err)=>{
            console.log(err)
        })

    }

}])
myapp.controller('serviceproviderviewcontroller',['$location','$http','$rootScope','$routeParams','$window','$sessionStorage',function($location,$http,$rootScope,$routeParams,$window,$sessionStorage){
    var main=this
    this.showbuttons=1
    this.organizationid=$routeParams.organizationid
    
    this.serviceproviderinfo=""
    this.newrequestsinfo=""
    this.ongoingrequestsinfo=""
    this.donerequestsinfo=""
    this.shownewrequests=0
    this.showongoingrequests=0
    this.showdonerequests=0
    this.getinfo=function(){
       
        $http.get('/api/serviceprovider/'+main.organizationid)
        .then((response)=>{
            
            main.serviceproviderinfo=response.data.provider
            console.log(main.serviceproviderinfo)
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
    this.getinfo()

  this.newreq=function(){
      var mydata={
          organizationid:main.serviceproviderinfo.organizationid,
          status:'new'
      }
      $http.post('/api/getrequests',mydata)
      .then((response)=>{
          console.log(response)
          main.newrequestsinfo=response.data.requests
          main.shownewrequests=1
          main.showbuttons=0
          main.showongoingrequests=0
          main.showdonerequests=0
          
      })
  }
  this.ongoingreq=function(){
    var mydata={
        organizationid:main.serviceproviderinfo.organizationid,
        status:'ongoing'
    }
    $http.post('/api/getrequests',mydata)
    .then((response)=>{
        console.log(response)
        main.ongoingrequestsinfo=response.data.requests
        main.shownewrequests=0
        main.showbuttons=0
        main.showongoingrequests=1
        main.showdonerequests=0
        
    })
}
this.donereq=function(){
    var mydata={
        organizationid:main.serviceproviderinfo.organizationid,
        status:'hired'
    }
    $http.post('/api/getrequests',mydata)
    .then((response)=>{
        console.log(response)
        main.donerequestsinfo=response.data.requests
        main.shownewrequests=0
        main.showbuttons=0
        main.showongoingrequests=0
        main.showdonerequests=1
        
    })
}
  this.closerequests=function(){
    main.shownewrequests=0
    main.showbuttons=1
    main.showongoingrequests=0
    main.showdonerequests=0 
  }
  this.updatestatus=function(requestid){
      $http.put('/api/updaterequest/'+requestid+'/ongoing')
      .then((request)=>{
          console.log(request)
          alert("Please Close and check the request in ongoing requests")
      })

  }
  this.makeitdone=function(requestid){
    $http.put('/api/updaterequest/'+requestid+'/hired')
    .then((request)=>{
        console.log(request)
        alert("Please Close and check the request in Done requests")
    })

}

}])