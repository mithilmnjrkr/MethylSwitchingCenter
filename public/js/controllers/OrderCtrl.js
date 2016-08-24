function OrderCtrl($scope, $state, $http, $filter, OrderService, CustomerService, getToken, LineItemService, FabricService, FeatureService, $rootScope, $stateParams){
	console.log('in OrderCtrl');
    $scope.customer = {};          
	$scope.new_order = {};
	$scope.orders = {};
  	$scope.customer_id = $stateParams.id;
  	$scope.order_id = $stateParams.orderId;

  	// set default line_item values
  	$scope.line_item = {};
    $scope.line_item.feature = {};

    $scope.groups = {};
    $scope.feature_options = {};    

    // Fetch Customer Details
    CustomerService.getDetailCustomer($scope.customer_id)   
    .then(function(response){
        //console.log('customer : ' + JSON.stringify(response));

        $scope.customer.detail = response.data.customer.detail;
        $scope.customer.profiles = response.data.customer.profiles;
        if($scope.customer.profiles.length > 0){
        	$scope.line_item.profile_id = $scope.customer.profiles[0].id //set default
        }
        $scope.orders = response.data.customer.orders

        $scope.new_order.customer_id = $scope.customer.detail.id;
        $scope.new_order.organization_id = $scope.customer.detail.organization_id;
    }, function(error) {
        console.log('Failed to get Customer : ' , error);
    });

    // Fetch All groups details(Feature, Feature Options)

	FeatureService.getAllGroupsDetail()
		.then(function(response){
			//console.log("Groups Detail: " + JSON.stringify(response));
			$scope.groups = response.data.groups;

			angular.forEach($scope.groups, function(group) {
			  	features = group.features
					angular.forEach(features, function(feature, key) {
					  	if(feature.feature_options[0])
							$scope.line_item.feature[feature.feature_options[0].feature_id] = feature.feature_options[0].code;													  	
					});				  	
			});
				
		},function(error){
			console.log("unable to fetch Group Details: ", error);
		})    

	// Fetch Token
    getToken.getAuthToken().then(function(response){
        //console.log("Res: " , response.data.token);
        $rootScope.token = response.data.token;
        //console.log("Got a Token: " + $rootScope.token)
    },function(error){
        console.log("Error ", error);
    });    

	$scope.getAllCustomerOfOrganization = function(){
		OrderService.allCustomerOfOrganizationProvider()
			.then(function(response){
				$scope.customers = response.data.customers;
				//console.log($scope.customers);
			}, function(error){
				console.log("unable to fetch org cust: " + error);
			})
	}	

	$scope.createOrder = function(){
		OrderService.createOrder($scope.new_order)
			.then(function(response){
				//console.log('Created Order : ' + JSON.stringify(response));
				$state.go('dashboards.order.new.line_items.step_one',{id: $scope.customer.detail.id,orderId : response.data.order.id});
			}, function(error){
				console.log("Unable to create order: " + error);
			})
	}

	$scope.showOrder = function(order_id){
		OrderService.showOrder(order_id)
			.then(function(response){
				//console.log('Order : ' + JSON.stringify(response));
			},function(error){
				console.log('Unable fetch Order' + error);
			})
	}

	$scope.deleteOrder = function(order){
		OrderService.deleteOrder(order)
			.then(function(response){
				//console.log('successfully delete order');
				$state.go('dashboards.customer.show', {'id' : $scope.customer.detail.id}, {reload: true});
			},function(error){
				console.log('unable to delete order : ' , error);
			})
	}

	$scope.deleteLineItem = function(line_item){
		LineItemService.deleteLineItem(line_item)
			.then(function(response){
				//console.log('successfully delete line_item');
				$state.go('dashboards.customer.show', {'id' : $scope.customer.detail.id}, {reload: true});
			},function(error){
				console.log('unable to delete line_item : ' , error);
			})
	}	

	$scope.selectFabric = function(fabric){
		$scope.line_item.main_fabric =  fabric.id;
		$state.go('dashboards.order.new.line_item.fabrics_features');
	}
	$scope.selectAccentFabric = function(fabric){
		$scope.line_item.accent_fabric =  fabric.id;
		$state.go('dashboards.order.new.line_item.fabrics_features');
	}	

	//Fetch All Fabric
	$scope.fabrics;
	$scope.fabricImages;
	$scope.fabricShirtPrices;
	FabricService.getAllFabrics()
		.then(function(response){
			//console.log(response)
            $scope.fabrics = response.data.fabrics;
            $scope.fabricImages = response.data.fabric_images;
            $scope.fabricShirtPrices = response.data.fabric_prices;
            //console.log('fabrics are : ' + JSON.stringify($scope.fabrics));	
			if($scope.fabrics[0]){
				$scope.line_item.main_fabric = $scope.fabrics[0].id
				$scope.line_item.accent_fabric = $scope.fabrics[0].id
			}
				
		},function(error){
			console.log('unable to fetch fabrics : ' , error);
		})    
       

	$scope.selectFeature = function(feature_options){
		console.log(JSON.stringify(feature_options));

		window.localStorage['feature_options'] = angular.toJson(feature_options);

		$state.go("dashboards.order.new.line_item.feature_options");
	}    

	$scope.getFeatureOptions = function(){
		$scope.feature_options = angular.fromJson(window.localStorage['feature_options']);
		console.log("feature_options : " + $scope.feature_options);
	}
	
	$scope.feature_option_item = function(){
		$state.go('dashboards.order.new.line_item.fabrics_features');
	}

	$scope.createNewLineItem = function(){
		$state.go('dashboards.order.new.line_item.fabrics_features');
	}	

	$scope.featureConfigurations = [];
	$scope.feature_config_code = {};
	$scope.saveLineItem = function(){
		$scope.line_item.order_id = $scope.order_id;
		
		angular.forEach($scope.line_item.feature, function(value, key) {
			$scope.feature_config_code.code = value;
			$scope.featureConfigurations.push($scope.feature_config_code);
			$scope.feature_config_code = {};
		});		
		console.log("Line Item to save : " + JSON.stringify($scope.line_item));
		console.log("Line Item featureConfigurations to save : " + JSON.stringify($scope.featureConfigurations));

		LineItemService.createLineItem($scope.line_item,$scope.featureConfigurations)
			.then(function(response){
				console.log('successfully line item order');
				$scope.featureConfigurations = [];
				$state.go('dashboards.order.new.line_items.step_one');
			},function(error){
				console.log('unable to delete line item : ' , error);
			})		
	}	

}

function OrderCreateCtrl($scope, $state, $http,  OrderService, CustomerService, getToken, LineItemService, FabricService, $rootScope, $stateParams){
	console.log("In OrderCreateCtrl")
	$scope.getOrder = function(){
		console.log('in getOrder' + JSON.stringify($stateParams));
		$scope.order_id = $stateParams.orderId;
		$scope.current_order = {};
		$scope.current_line_items = [];
		OrderService.showOrder($scope.order_id)
			.then(function(response){
				console.log('Order : ' + JSON.stringify(response));
				$scope.current_order = response.data.order;
				$scope.current_line_items = response.data.line_items;
			},function(error){
				console.log('Unable fetch Order' + error);
			})		
	}
}




angular
	.module('juki')
	.controller('OrderCtrl', OrderCtrl)
	.controller('OrderCreateCtrl', OrderCreateCtrl)