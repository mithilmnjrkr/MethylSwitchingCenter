function CustomerService($http){
	this.addCustomer = function(customer){
		return $http({
		    method : 'POST',
            url : '/customers',
            data : {
                'customer' : customer
		    }		    
		});
	}	
	this.deleteCustomer = function(customer_id){
		return $http({
		    method : 'DELETE',
            url : '/customers/' + customer_id		    
		});
	}	
	this.getDetailCustomer = function(customer_id){
		return $http({
		    method : 'GET',
            url : '/customers/get_detail/' + customer_id		    
		});
	}	
}

angular
	.module('juki')
    .service('CustomerService', CustomerService)	
	