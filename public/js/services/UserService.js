function UserService($http){
	this.addUser = function(user){
		return $http({
		    method : 'POST',
            url : '/user/add',
            data : {
                'user' : user
		    }		    
		});
	}	
	this.deleteUser = function(user_id){
		return $http({
		    method : 'DELETE',
            url : '/users/' + user_id		    
		});
	}	
}

angular
	.module('juki')
	.service('UserService', UserService)