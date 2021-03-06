myapp.config(['$routeProvider',function($routeProvider){
 $routeProvider
 
 .when('/',{
     templateUrl:'views/loginview.html',
     controller:'logincontroller',
     controllerAs:'loginc'
 })
 .when('/customerregistration',{
    templateUrl:'views/customerregistration.html',
    controller:'customerregistrationcontroller',
    controllerAs:'cusregc'
 })
 .when('/serviceproviderregistration',{
    templateUrl:'views/serviceproviderregistration.html',
    controller:'serviceproviderregistrationcontroller',
    controllerAs:'serproc'
 })
 .when('/customerlogin',{
    templateUrl:'views/customerlogin.html',
    controller:'customerlogincontroller',
    controllerAs:'cuslogc'
 })
 .when('/serviceproviderlogin',{
    templateUrl:'views/serviceproviderlogin.html',
    controller:'serviceproviderlogincontroller',
    controllerAs:'serprologc'
 })
 .when('/customer/:customerid',{
    templateUrl:'views/customerview.html',
    controller:'customerviewcontroller',
    controllerAs:'cusviewc'
 })
 .when('/serviceprovider/:organizationid',{
    templateUrl:'views/serviceproviderview.html',
    controller:'serviceproviderviewcontroller',
    controllerAs:'serproviewc'
 })
}])