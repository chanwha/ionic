angular.module('app.services', [])

.factory('groupFactory', function($localstorage){
  /*
  var groups = [{
    groupId: 0,
    groupName: '14년 매입',
	realEstareCount: 5,
	lmntDttm: '2015-10-10',
    SaleOrRental: '매매',
    getOrPut: '구하기'
  }, {
    groupId: 1,
    groupName: '14년 전세',
	realEstareCount: 4,
	lmntDttm: '2015-11-11',
    SaleOrRental: '전세',
    getOrPut: '내놓기'
  }, {
    groupId: 2,
    groupName: '14년 월세',
	realEstareCount: 3,
	lmntDttm: '2015-10-01',
    SaleOrRental: '월세',
    getOrPut: '구하기'
  }];
*/
	//var groups = [];
	var groups = [];
  return {
	set: function() {
      groups = $localstorage.getObject('lsGroup');
    },
    all: function() {
      return groups;
    },
    remove: function(group) {
        console.log('remove실행2');
      groups.splice(groups.indexOf(group), 1);
	  $localstorage.setObject('lsGroup',groups);
    },
    get: function(Id) {
      for (var i = 0; i < groups.length; i++) {
        if (groups[i].groupId === Id) {
          return groups[i];
        }
      }
      return null;
    },
	add: function(group) {
      groups.push(group);
	  $localstorage.setObject('lsGroup',groups);
    }
  };
})

.factory('realEstateFactory', function($localstorage){
	/*
  var realEstateList = [{
    groupId: 0,
	reId: 0,
    reAddres: '현대아파트 10동 1001호',
	lmntDttm: '2015-10-10',
    SaleOrRental: '매매',
    getOrPut: '구하기',
	price: '200000000',
	currStatus: '계약금',
	desc: '(비고) 개키웠던듯 개냄새 진동. 벽지는 집주인이 해준다고 했음.'
  }, {
    groupId: 0,
	reId: 1,
    reAddres: '현대아파트 10동 1002호',
	lmntDttm: '2015-10-10',
    SaleOrRental: '매매',
    getOrPut: '구하기',
	price: '200000000',
	currStatus: '계약금',
	desc: '(비고) 개키웠던듯 개냄새 진동. 벽지는 집주인이 해준다고 했음.'
  }, {
    groupId: 1,
	reId: 2,
    reAddres: '현대아파트 10동 1003호',
	lmntDttm: '2015-10-10',
    SaleOrRental: '매매',
    getOrPut: '구하기',
	price: '200000000',
	currStatus: '계약금',
	desc: '(비고) 개키웠던듯 개냄새 진동. 벽지는 집주인이 해준다고 했음.'
  }];
*/
	//var realEstateList = $localstorage.getObject('lsRealEstateList');
	var realEstateList = [];
  return {
	set: function() {
      realEstateList = $localstorage.getObject('lsRealEstateList');
    },
    all: function() {
      return realEstateList;
    },
    remove: function(realEstate) {
      realEstateList.splice(realEstateList.indexOf(realEstate), 1);
	  $localstorage.setObject('lsRealEstateList', realEstateList);
    },
    get: function(Id) {
      for (var i = 0; i < realEstateList.length; i++) {
        if (realEstateList[i].reId === Id) {
          return realEstateList[i];
        }
      }
      return null;
    },
	
	getListByGroup: function(groupId) {
		var realEstateListTmp = [];
      for (var i = 0; i < realEstateList.length; i++) {
		  //console.log(realEstateList[i].groupId);
        if (realEstateList[i].groupId === parseInt(groupId)) {
          realEstateListTmp.push(realEstateList[i]);
        }
      }
	  return realEstateListTmp;
    }
	
  };
})

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.service('BlankService', [function(){

}]);

