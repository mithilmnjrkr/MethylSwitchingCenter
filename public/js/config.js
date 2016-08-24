
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds

    $urlRouterProvider.otherwise("/dashboards/dashboard");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

        .state('dashboards', {
            abstract: true,
            url: "/dashboards",
            templateUrl: "views/common/content.html",
        })
        .state('dashboards.dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard/dashboard.html"
        })        
 
        .state('dashboards.organization', {
            url: "/organizations",
            templateUrl: "views/organization/organizations.html",
            controller: 'OrganizationsCtrl'            
        })    
        .state('dashboards.organization.all', {
            url: "/all",
            views: {
              'organizations': {
                  templateUrl: 'views/organization/organization_all.html'
              }
            }
        })             
        .state('dashboards.organization.new', {
            url: "/new",
            views: {
              'organizations': {
                  templateUrl: 'views/organization/organization_new.html'
              }
            }
        })   
        .state('dashboards.organization.show', {
            url: "/show/:id",            
            views: {
              'organizations': {
                  templateUrl: 'views/organization/organization_show.html',
                  controller: 'OrganizationShowCtrl'
              }
            }
        })  
        .state('dashboards.users', {
            url: "/users",
            controller: "UsersCtrl",
            templateUrl: "views/user/users.html",            
        })
        .state('dashboards.users.all', {
            url: "/all",
            views: {
              'users': {
                  templateUrl: 'views/user/users_all.html'
              }
            }
        })
        .state('dashboards.locations', {
            url: "/locations",
            controller: "LocationCtrl",
            templateUrl: "views/location/locations.html",            
        })
        .state('dashboards.locations.all', {
            url: "/all",
            views: {
              'locations': {
                  templateUrl: 'views/location/locations_all.html'
              }
            }
        })               
        .state('dashboards.fabrics', {
            url: "/fabrics",
            controller: "FabricsCtrl",
            templateUrl: "views/fabric/fabrics.html", 
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }                        
        })
        .state('dashboards.fabrics.all', {
            url: "/all",
            templateUrl: 'views/fabric/fabrics_all.html'
        }) 
        .state('dashboards.fabrics.new', {
            url: "/new",
           templateUrl: 'views/fabric/fabric_new.html'
        })
        
        .state('dashboards.fabrics.show', {
            url: "/show/:id",
            controller: "fabricByIdCtrl",
            templateUrl: 'views/fabric/fabrics_show.html'                     
        })         
        .state('dashboards.fabrics.priceLevel', {
            url: "/priceLevel",
            templateUrl: 'views/fabric/fabricPriceLevels.html',
            controller: "FabricPriceLevelsCtrl"
        })         
        .state('dashboards.features', {
            url: "/features",
            controller: "FeaturesCtrl",
            templateUrl: "views/feature/features.html",
        })
        .state('dashboards.features.new', {
            url: "/new",
            templateUrl: 'views/feature/feature_form.html'
        })  
        .state('dashboards.features.feature_options', {
            url: "/feature_options",
            templateUrl: 'views/feature/feature_option_form.html' 
        })
        
        .state('dashboards.features.feature_group', {
            url: "/feature_group",
            templateUrl: 'views/feature/feature_group_form.html'
        })

    // Customer states start
        .state('dashboards.customers', {
            url: "/customers",
            controller: "CustomersCtrl",
            templateUrl: "views/customer/customers.html",            
        })
        .state('dashboards.customers.all', {
            url: "/all",
            views: {
              'customers': {
                  templateUrl: 'views/customer/customers_all.html'
                }
            }
        })
        .state('dashboards.customers.new', {
            url: "/new",
            views: {
              'customers': {
                  templateUrl: 'views/customer/customer_new.html'
                }
            }
        })
    // Customer states end

    // Specific Customer states start

        .state('dashboards.customer', {
            url: "/customer/:id", 
            templateUrl: "views/customer/customer.html",
            controller: "CustomerShowCtrl"
        })        
        .state('dashboards.customer.show', {
            url: "/show",
            views: {
                "orders": { 
                            templateUrl: "views/customer/tabs/tab_orders.html",
                            controller: "OrderCtrl"
                        },
                "profiles": { templateUrl: "views/customer/tabs/tab_profiles.html" },
            }
        })  
        .state('dashboards.customer.new_profile', {
            url: "/new",

            views: {
                "orders": { 
                            templateUrl: "views/customer/tabs/tab_orders.html",
                            controller: "OrderCtrl"
                        },
                "profiles": { 
                                templateUrl: "views/customer/customer_profile_form.html",
                                controller: "ProfileCtrl"
                            },

            }  
        }) 

        .state('dashboards.customer.new_shirt_profile', {
            url: "/new_shirt_profile",

            views: {
                "orders": { 
                            templateUrl: "views/customer/tabs/tab_orders.html",
                            controller: "OrderCtrl"
                        },
                "profiles": { 
                                templateUrl: "views/customer/shirt_profile_form.html",
                                controller: "ProfileCtrl"
                            },

            }  
        })        
        .state('dashboards.customer.edit_profile', {
            url: "/profile/edit/:profileId",
            views: {
                "orders": { 
                            templateUrl: "views/customer/tabs/tab_orders.html",
                            controller: "OrderCtrl"
                        },
                "profiles": { 
                                templateUrl: "views/customer/customer_profile_form.html" ,
                                controller: "ProfileCtrl"
                            }
            }    
        })
        .state('dashboards.customer.show_profile', {
            url: "/profile/:profile",
            views: {
                "orders": { 
                            templateUrl: "views/customer/tabs/tab_orders.html",
                            controller: "OrderCtrl" },
                "profiles": { 
                                templateUrl: "views/customer/customer_profile_show.html" ,
                                controller: "ProfileCtrl" }
            }    
        }) 
    // Specific Customer states end

    // Order states start
        .state('dashboards.order', {
            url: "/customer/:id", 
            templateUrl: "views/order/order.html",
            controller: "OrderCtrl"
        })         
       
        .state('dashboards.order.new', {
            url: '/order/new/:orderId',
            templateUrl: "views/order/order_wizard.html",
            controller: "OrderCtrl"            
        })        
        .state('dashboards.order.new.line_items', {
            url: '/line_items',
            templateUrl: "views/order/line_items.html",
        })
        .state('dashboards.order.new.line_items.step_one', {
            url: '/step_one',
            templateUrl: 'views/wizard/step_one.html',
            controller: "OrderCreateCtrl",
            data: { pageTitle: 'order form' }
        })
        .state('dashboards.order.new.line_items.step_two', {
            url: '/step_two',
            templateUrl: 'views/wizard/step_two.html',
            data: { pageTitle: 'order form' }
        })
        .state('dashboards.order.new.line_items.step_three', {
            url: '/step_three',
            templateUrl: 'views/wizard/step_three.html',
            data: { pageTitle: 'order form' }
        })  

        .state('dashboards.order.new.line_item', {
            url: '/line_item',
            templateUrl: 'views/order/line_item.html',
            data: { pageTitle: 'order form' }
        })
        .state('dashboards.order.new.line_item.fabrics_features', {
            url: '/fabrics_features',
            templateUrl: 'views/order/fabrics_features.html',
            data: { pageTitle: 'order form' }
        })
        .state('dashboards.order.new.line_item.fabrics', {
            url: '/fabrics',
            templateUrl: 'views/order/fabric_options.html',
            data: { pageTitle: 'order form' }
        })
        .state('dashboards.order.new.line_item.fabrics_accent', {
            url: '/fabrics_accent',
            templateUrl: 'views/order/fabric_accent_options.html',
            data: { pageTitle: 'order form' }
        })        
        .state('dashboards.order.new.line_item.feature_options', {
            url: '/feature_options',
            templateUrl: 'views/order/feature_options.html',
         
            data: { pageTitle: 'order form' }
        }) 
        .state('dashboards.order.new.line_item.cuff_features', {
            url: '/cuff_features',
            templateUrl: 'views/order/feature_options_cuff.html',
            data: { pageTitle: 'order form' }
        })
        .state('dashboards.order.new.line_item.pocket_features', {
            url: '/pocket_features',
            templateUrl: 'views/order/feature_options_pocket.html',
            data: { pageTitle: 'order form' }
        })
    // Order states end
}
function httpInterceptor($httpProvider) {
    $httpProvider.interceptors.push(function($q, $rootScope) {
        return {
            'request':function(config){
                $("#loader").show();
                if(config.method != "GET"){
                    config.params = {"authenticity_token" : $rootScope.token }
                }
                return config;
            },
            'response': function(response){
                $("#loader").hide();
                return response;
            },
            'responseError': function(rejection){
                $("#loader").hide();
                if (rejection.status === 401) {
                    //Fix Me
                    //Show notification message
                }               
                 return $q.reject(rejection);
            }

        };
    });
}

angular
    .module('juki')
    .config(config)
    .config(httpInterceptor)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
