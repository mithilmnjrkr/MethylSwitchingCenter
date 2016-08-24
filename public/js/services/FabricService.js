function FabricService($http){
	this.addFabric = function(fabric,file){

       var fd = new FormData();
       fd.append('image', file);
       fd.append('sartor_code', fabric.sartor_code);
       fd.append('name', fabric.name);
       fd.append('description', fabric.description);
       fd.append('mill_name', fabric.mill_name);
       fd.append('fabric_price_level_id', fabric.fabric_price_level_id);

		return $http({
		    method : 'POST',
		    transformRequest: angular.identity,
            url : '/fabrics',
            data : fd,
            headers: {'Content-Type': undefined}		    
		});
	}	

	this.deleteFabric = function(fabric_id){
		return $http({
		    method : 'DELETE',
            url : '/fabrics/' + fabric_id		    
		});
	}

	this.getAllFabrics = function(){
		return $http({
			method: 'GET',
			url: '/fabrics'
		});
	}	 

	this.getFabricByid = function(fabric_id){
		return $http({
			method: 'GET',
			url: '/fabrics/' + fabric_id + ".json"
		});
	}
}

function FabricPriceLevelService($http){
	this.addFabricPriceLevel = function(fabric_price_level){
		return $http({
		    method : 'POST',
            url : '/fabric_price_levels',
            data : {
                'fabric_price_level' : fabric_price_level
		    }		    
		});
	}	
	this.deleteFabricPriceLevel = function(fabric_price_level_id){
		return $http({
		    method : 'DELETE',
            url : '/fabric_price_levels/' + fabric_price_level_id		    
		});
	}	
}
angular
	.module('juki')
    .service('FabricService', FabricService)
    .service('FabricPriceLevelService', FabricPriceLevelService)