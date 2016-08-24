
function getToken($http){
	
	this.getAuthToken = function(){
		return $http({
			method: 'GET',
			async: false,
			url: '/user/get_token'
		});
	};
}


/**
 *
 * Pass all functions into module
 */
angular
    .module('juki')
    .service('getToken', getToken)
