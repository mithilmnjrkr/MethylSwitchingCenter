function LineItemService($http){
	this.createLineItem = function(line_item,featureConfigurations){
		return $http({
			method: 'POST',
			url: '/line_items',
			data: {
				'line_item': line_item,
				'featureConfigurations': featureConfigurations
			}
		});
	}

	this.deleteLineItem = function(line_item){
		return $http({
			method: 'DELETE',
			url: '/line_items/' + line_item
		});
	}
}

angular
	.module('juki')
	.service('LineItemService', LineItemService)