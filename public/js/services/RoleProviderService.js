function roleProvider($http){
	this.getUserRole = function(){
		return $http({
			method : 'GET',
			url : '/user/get_user_role',
			cache: true,
			async: false
		})
	}
}

angular
.module('juki')
	.service('RoleProviderService', roleProvider)