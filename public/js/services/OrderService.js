function OrderService($http){
	
	this.allCustomerOfOrganizationProvider = function(){
		return $http({
			method: 'GET',
			url: '/customers'
		});
	};

	this.getOrders = function(customer){
		return $http({
			method: 'GET',
			url: '/customers/get_orders/' + customer
		});
	}

	this.createOrder = function(order){
		return $http({
			method: 'POST',
			url: '/orders',
			data: {
				'order': order
			}
		});
	}

	this.showOrder = function(order){
		return $http({
			method: 'GET',
			url: '/orders/' + order
		});
	}

	this.deleteOrder = function(order){
		return $http({
			method: 'DELETE',
			url: '/orders/' + order
		});
	}
}


angular
	.module('juki')
	.service('OrderService', OrderService)