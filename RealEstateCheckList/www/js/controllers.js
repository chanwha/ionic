angular.module('app.controllers', [])
  
.controller('groupListCtrl', function($scope, groupFactory, $localstorage) {
  //프로그램 초기화
  if($localstorage.get('isFirst', 'true') === 'true'){
	  console.log('최초실행O');
	  $localstorage.setObject('lsGroup', []);
	  $localstorage.setObject('lsRealEstateList', []);
	  $localstorage.set('isFirst', 'false');
  }else{
	  
      console.log('최초실행X');  
  }
  //var d = new Date();
  //console.log(''+d.getFullYear()+(d.getMonth() + 1)+d.getDate()+d.getHours()+d.getMinutes()+d.getSeconds());
  
  groupFactory.set();
  $scope.groups = groupFactory.all();
    
  $scope.remove = function(group) {
        console.log('remove실행');
    groupFactory.remove(group);
    
  };
    
  $scope.itemButtons = [{
        text: 'Delete',
        type: 'button-assertive',
        onTap: function(item) {
          $scope.removeItem(item);
        }
      }];
})
   
.controller('realEstateListCtrl', function($scope, $stateParams, groupFactory, realEstateFactory) {
  
  groupFactory.set();
  realEstateFactory.set();
  
  $scope.groupId =  $stateParams.groupId;
  $scope.group = groupFactory.get($scope.groupId);
  $scope.groupName = $scope.group.groupName;
  //$scope.group = groupFactory.get($stateParams.groupId);
  //$scope.groupName = $scope.group.groupName;
  $scope.realEstateList = realEstateFactory.getListByGroup($scope.groupId);
  
  //console.log($scope.groups[0].groupName);
  
  /*
  for (var i = 0; i < $scope.groups.length; i++) {
        if ($scope.groups[i].groupId === parseInt($scope.groupId)) {
          $scope.groupName = $scope.groups[i].groupName;
		  console.log($scope.groups[i].groupName);
        }
	}
	 */ 
	
})
   
.controller('addGroupCtrl', function($scope, $ionicPopup, $state, groupFactory, $cordovaCamera) {
     
      $scope.list = groupFactory.all();
	  var d = new Date(); 
	  //var groupName = element(by.model('inputGouppName'));
	  
		$scope.data = {
		gubunSelect: [
		  {value: '구하기', name: '구하기'},
		  {value: '내놓기', name: '내놓기'}
		],
		typeSelect: [
		  {value: '매매', name: '매매'},
		  {value: '전세', name: '전세'},
		  {value: '월세', name: '월세'}
		],
		selectedGubunOption: {value: '구하기', name: '구하기'}, //최초 선태값
		selectedTypeOption: {value: '전세', name: '전세'} //최초 선태값
		};
		$scope.data.inputGroupName = '';
		
		
      $scope.addItem = function(form) {
          console.log('additem');
		
		if($scope.data.inputGroupName === ''){
			   var alertPopup = $ionicPopup.alert({
				 title: '그룹이름 입력 오류',
				 template: '그룹이름을 입력해 주세요.'
			   });
			   alertPopup.then(function(res) {
				 //
			   });
			return;
		}
		//키값은 년월일시분초 이거면 겹칠일없음. /*근데 먼가 겹치나봄 듑남 */
        var newItem = {
			groupId: ''+d.getFullYear()+(d.getMonth() + 1)+d.getDate()+d.getHours()+d.getMinutes()+d.getSeconds(),
			groupName: $scope.data.inputGroupName,
			SaleOrRental: $scope.data.selectedTypeOption.value,
			getOrPut: $scope.data.selectedGubunOption.value,
			lmntDttm: d.getFullYear()+'/'+(d.getMonth() + 1)+'/'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()
		};
        // Add values from form to object
		
        // If this is the first item it will be the default item
        if ($scope.list.length == 0) {
          newItem.useAsDefault = true;
        } else {
          // Remove old default entry from list	
          if (newItem.useAsDefault) {
            removeDefault();
          }
        }
          
    


        // Save new list in scope and factory
        //$scope.list.push(newItem);
		groupFactory.add(newItem);
		$state.go('groupListApp');
      };
    
	$scope.takePicture = function(){
		document.addEventListener("deviceready", function () {

			var options = {
			  quality: 50,
			  destinationType: Camera.DestinationType.DATA_URL,
			  sourceType: Camera.PictureSourceType.CAMERA,
			  allowEdit: true,
			  encodingType: Camera.EncodingType.JPEG,
			  targetWidth: 100,
			  targetHeight: 100,
			  popoverOptions: CameraPopoverOptions,
			  saveToPhotoAlbum: false,
			  correctOrientation:true
			};
			
			
			$cordovaCamera.getPicture(options).then(function(imageData) {
			  var image = document.getElementById('myImage');
			  image.src = "data:image/jpeg;base64," + imageData;
			}, function(err) {
			  // errorA
			});
	

		}, false);
	};
  
    /*
    		//var takePicture = function(){
			$scope.takePicture = function(){
			var options = {     
				quality          : 75,
				destinationType  : Camera.DestinationType.DATA_URL,
				sourceType       : Camera.PictureSourceType.CAMERA,
				allowEdit        : true,
				encodingType     : Camera.EncodingType.JPEG,
				targetWidth      : 300,
				targetHeight     : 300,
					popoverOptions   : CameraPopoverOptions,
				saveToPhotoAlbum : false
			};
			
			$cordovaCamera.getPicture(options)
			//navigator.camera.getPicture(function(imageURI) {
//
			//}, function(err) {

			//}, options);
		};
		//$scope.takePicture = takePicture;
	*/
	

})
   
.controller('realEstateDetailCtrl', function($scope, $stateParams, groupFactory, realEstateFactory) {
  
  groupFactory.set();
  realEstateFactory.set();
  
  $scope.groupId =  $stateParams.groupId;
  $scope.reId =  $stateParams.reId;
  $scope.group = groupFactory.get($stateParams.groupId);
  $scope.groupName = $scope.group.groupName;
  
  //$scope.group = groupFactory.get($stateParams.groupId);
  //$scope.groupName = $scope.group.groupName;
  $scope.realEstate = realEstateFactory.get($scope.reId);
  
  console.log($scope.reId);
  console.log($scope.realEstate.reId);
  
})
   
.controller('configCtrl', function($scope) {

})

.controller('addRealEstateCtrl', function($scope, $stateParams, groupFactory, realEstateFactory) {
  
  groupFactory.set();
  realEstateFactory.set();
  
  $scope.groupId =  $stateParams.groupId;
  $scope.reId =  $stateParams.reId;
  $scope.group = groupFactory.get($stateParams.groupId);
  $scope.groupName = $scope.group.groupName;
  
  //$scope.group = groupFactory.get($stateParams.groupId);
  //$scope.groupName = $scope.group.groupName;
  $scope.realEstate = realEstateFactory.get($scope.reId);
  
  console.log($scope.reId);
  console.log($scope.realEstate.reId);
  
})
 