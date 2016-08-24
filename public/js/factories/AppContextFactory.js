function AppContextFactory(){

	var role = {
			Rolename: ''
	};
    return {
        getRoleName: function () {
            return role.Rolename;
        },
        setRoleName: function (r) {
        	console.log("Setting Role: " + r);
            role.Rolename = r;
        }
    };
}

angular
	.module('juki')
	.factory('AppContextFactory', AppContextFactory)