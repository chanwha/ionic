angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('groupListApp', {
    url: '/RECheckList',
    templateUrl: 'templates/groupList.html',
	controller: 'groupListCtrl'
  })
  
   .state('realEstateListApp', {
    url: '/RECheckList/:groupId',
    templateUrl: 'templates/realEstateList.html',
	controller: 'realEstateListCtrl'
  })
  
  .state('realEstateDetailApp', {
    url: '/RECheckList/:groupId/:reId',
    templateUrl: 'templates/realEstateDetail.html',
	controller: 'realEstateDetailCtrl'
  })
  .state('addRealEstateApp', {
    url: '/addRealEstate/:groupId',
    templateUrl: 'templates/addRealEstate.html',
	controller: 'addRealEstateCtrl'
  })
  
  .state('addGroupApp', {
    url: '/addGroup',
    templateUrl: 'templates/addGroup.html',
	controller: 'addGroupCtrl'
  })
  
  .state('configApp', {
    url: '/config',
    templateUrl: 'templates/config.html',
	controller: 'configCtrl'
  })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/RECheckList');

});