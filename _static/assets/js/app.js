(function() {
  "use strict";

  var app = angular.module('app', ['ngRoute']);

  // HACK: jekyll liquid {{}} tags conflict with angular, so changing to [[]] for now
  app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
  });

  app.controller('IndustryController', ['$scope', '$http', function($scope, $http) {
    var self = $scope.industry = {};

    self.name = 'Hello World!!';

    self.data = {};

    self.data.transporters = [{
      company_name: "",
      us_epa_id_number: "",
      signatory_name: "",
      transporter_signatory_date_month: "",
      transporter_signatory_date_day: "",
      transporter_signatory_date_year: ""
    }];

    self.addTransporter = function() {
      self.data.transporters.push({
        company_name: "",
        us_epa_id_number: "",
        signatory_name: "",
        transporter_signatory_date_month: "",
        transporter_signatory_date_day: "",
        transporter_signatory_date_year: ""
      });
    };

    self.removeTransporter = function(index) {
      self.data.transporters.splice(index, 1);
    };

    self.data.manifest_items = [{
      state_waste_codes: [{waste_code: ''}]
    }];

    self.addManifestItem = function() {
      self.data.manifest_items.push({
        state_waste_codes: [{waste_code: ''}]
      });
    };

    self.removeManifestItem = function(index) {
      self.data.manifest_items.splice(index, 1);
    };

    self.addStateWasteCode = function(index) {
      self.data.manifest_items[index].state_waste_codes.push({waste_code: ''});
    };

    self.removeStateWasteCode = function(parentIndex, index) {
      self.data.manifest_items[parentIndex].state_waste_codes.splice(index, 1);
    };

    self.submit = function() {
      $http.post('/api/manifest/submit/' + self.data.generator_manifest_tracking_number, self.data).then(function() {
        window.location.href = '/web/done.html';
      });
    };
  }]);

    
    app.controller('SearchController', function($scope, $http) {

        var self = $scope.search = {};
        $scope.data = {};
        $scope.filtered = {};
        $scope.results = {};

        $scope.msg = "Search";
        
        $http.get('/api/manifest/search').success(
            function(response) {
                for(var i = 0; i < response.length; i++)
                {
                    var item = response[i];
                    
                    //fix for my local env.
                    if(typeof item.content == "string")
                    {
                        item.content = item.content.replace(/[=]/g, ":");
                        item.content = item.content.replace(/[>]/g, "");
                        item.content = jQuery.parseJSON(item.content);
                    }
                    
                    console.log(item.id);
                    console.log(item.content.generator_name);
                }

                $scope.results = response;
                $scope.filtered = response;
            });

        $scope.filter = function() {
            var gname = $scope.data.generator_name;
            var tname = $scope.data.tsdf_name;
            var items = new Array();

            for(var i = 0; i < $scope.results.length; i++)
            {
                var isAdded = false;
                var item = $scope.results[i];

                if(gname != undefined && gname == item.content.generator_name)
                {
                    items.push(item);
                    isAdded = true;
                }

                if(isAdded == false && tname != undefined && tname == item.content.designated_facility_name)
                {
                   items.push(item); 
                }
            }

            $scope.filtered = items; 
        };
        
        $scope.manifestDetail = function(data) {
            window.location.href = '/web/manifest-detail.html?id='+data.id;
        }
    });
    
    app.controller('ManifestDetailController', ['$scope','$http',function($scope, $http) {
   
        function getQueryParams(qs) {
            qs = qs.split('+').join(' ');

            var params = {},
                tokens,
                re = /[?&]?([^=]+)=([^&]*)/g;

            while (tokens = re.exec(qs)) {
                params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
            }

            return params;
        }
        
        var id = getQueryParams(document.location.search).id;;
        $http.get('/api/manifest/id/'+id).success(
            function(response) {
                //fix for my local env.
                console.log(typeof response.content);
                if(typeof response.content == "string")
                {
                    response.content = response.content.replace(/[=]/g, ":");
                    response.content = response.content.replace(/[>]/g, "");
                    response.content = jQuery.parseJSON(response.content);
                }
              $scope.data = response;
            });
    }]);
    
  app.controller('LoginController', function($scope, $http) {
    $scope.state = 'login';

    $scope.authenticate = function() {
      self.data = {
        userId: $("#userId").val(),
        password: $("#password").val()
      };
      
      $http.post('/api/user/authenticate', self.data).success(
        function(response) {
          $scope.results = response;
          $scope.state = 'answer';
          console.log("show me the answer");
        });
    };
  }).directive("signLogin", function() {
    return {
      templateUrl: "sign-login.html"
    };
  }).directive("signAnswer", function() {
    return {
      templateUrl: "sign-answer.html"
    };
  });

  if ($().selectize) {
    $(function() {
      $('.manifest_item_epa_waste_code').selectize({
        delimiter: ',',
        create: true
      });
    });
  }
}

)();
