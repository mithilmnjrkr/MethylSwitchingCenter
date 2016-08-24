function FabricsCtrl(getToken, $scope, $rootScope, $state, $http, FabricService, $stateParams, SweetAlert) {
    console.log('In FabricsCtrl');
    $scope.allData = {};
    getToken.getAuthToken().then(function(response){
        console.log("Res: " , response.data.token);
        $rootScope.token = response.data.token;
        console.log("Got a Token: " + $rootScope.token)
    },function(error){
        console.log("Error ", error);
    });  

    $scope.getAllFabrics = function(){
        $http.get('/fabrics.json').success( function(response) {
            $scope.fabrics = response.fabrics;
            $scope.fabricImages = response.fabric_images;
            $scope.fabricShirtPrices = response.fabric_prices;
            console.log('fabrics are : ' + JSON.stringify($scope.fabrics));
        });     
    }
    
    $scope.getAllFabricPriceLevels = function(){
        $http.get('/fabric_price_levels.json').success( function(response) {
            $scope.allData.fabric_price_levels = response.fabric_price_levels;
            $scope.allData.selected_fabric_price_level = $scope.allData.fabric_price_levels[0];
            console.log('fabric_price_levels: ' + JSON.stringify($scope.fabric_price_levels));
        });       
    }


    
    $scope.fabric = {};
    $scope.image = {};
    $scope.createFabric = function(){

        $scope.fabric.fabric_price_level_id = $scope.allData.selected_fabric_price_level.id
        var file = $scope.image.avtar;

        FabricService.addFabric($scope.fabric,file)   
        .then(function(response){
            $state.go('dashboards.fabrics.all',{}, {reload: true});
        }, function(error) {
            console.log('Failed to create fabric : ' + error);
        });
    }   

    $scope.deleteFabric = function(fabric_id){
        console.log("delete = "+fabric_id)
        FabricService.deleteFabric(fabric_id)   
        .then(function(response){
            $state.go('dashboards.fabrics.all',{}, {reload: true});
        }, function(error) {
            console.log('Failed to delete Fabric : ' + error);
        });
    }    

    // Sweet Alert
    $scope.sweetAlertSuccess = function (message) {
        console.log("In SweetAlert");
        SweetAlert.swal({
            title: message,
            type: "success"
        });
        
    }

    $scope.sweetAlertError = function (message) {
        console.log("In SweetAlertError");
        SweetAlert.swal({
                title: message,
                type: "warning",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                closeOnConfirm: true,
        });
        
    }       
};

function fabricByIdCtrl ($stateParams, $scope, FabricService, $http){
    $scope.getFabricById = function() {
    fabric_id = $stateParams.id;
        FabricService.getFabricByid(fabric_id)
            .then(function(response){
                console.log("Fabric info: " + JSON.stringify(response.data));
                $scope.fabricData = response.data.fabrics;
                $scope.fabShirtPrice = response.data.fabric_prize
                $scope.fabricImage = response.data.fabric_image
            }, function(error){
                console.log("Error occured while fetching fabric info by id");
            })
    }

    $scope.sendMail = function(){
        
        $http.get('/show_fabric?id=' + $stateParams.id +'&email=' + $scope.toEmail)
        .success(function(response){
            console.log("Email Sent!"+angular.toJson(response));
            message = "Email Sent!";
            $scope.sweetAlertSuccess(message);
        }, function(error){
            console.log("Oops Something went wrong while sending email")
            message = "Oops Something went wrong while sending email";
            $scope.sweetAlertError(message);
        })
        
    }
}


function FabricPriceLevelsCtrl(getToken, $state, $rootScope, $scope, $http, FabricPriceLevelService) {
    console.log('In FabricPriceLevelsCtrl');

    $http.get('/fabric_price_levels.json').success( function(response) {
        $scope.fabric_price_levels = response.fabric_price_levels;
        console.log('fabric_price_levels: ' + JSON.stringify($scope.fabric_price_levels));
    });

    getToken.getAuthToken().then(function(response){
        console.log("Res: " , response.data.token);
        $rootScope.token = response.data.token;
        console.log("Got a Token: " + $rootScope.token)
    },function(error){
        console.log("Error ", error);
    }); 

    $scope.fabric_price_level = {};

    $scope.createFabricPriceLevel = function(){
        FabricPriceLevelService.addFabricPriceLevel($scope.fabric_price_level)   
        .then(function(response){
            $state.go('dashboards.fabrics.priceLevel',{}, {reload: true});
        }, function(error) {
            console.log('Failed to create fabric_price_level : ' + error);
        });
    }    
    $scope.deleteFabricPriceLevel = function(fabric_price_level_id){
        FabricPriceLevelService.deleteFabricPriceLevel(fabric_price_level_id)   
        .then(function(response){
            $state.go('dashboards.fabrics.priceLevel',{}, {reload: true});
        }, function(error) {
            console.log('Failed to delete fabric_price_level : ' + error);
        });
    }    
};



angular
	.module('juki')
    .controller('FabricsCtrl', FabricsCtrl)
    .controller('FabricPriceLevelsCtrl', FabricPriceLevelsCtrl)
    .controller('fabricByIdCtrl',fabricByIdCtrl)