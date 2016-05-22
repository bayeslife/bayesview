'use strict';

/**
 * @ngdoc service
 * @name bayesview3App.dataservice
 * @description
 * # dataservice
 * Service in the bayesview3App.
 */
angular.module('bayesview3App')
  .service('dataservice', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {	
        selectSession: function () {
            return $http(
                {
                    method: 'GET',
                    url: '/bayes3/_design/bayes/_view/sessiont',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        },	
        deleteSession: function (document) {
            return $http(
                {
                    method: 'DELETE',                    
                    url: '/bayes3/'+document._id,
                    params: {
                        "rev": document._rev
                    },                    
                    headers: {
                        "Content-Type": "application/json"                            
                    }
                });
        },
    	selectContent: function () {
            return $http(
                {
                    method: 'GET',
                    url: '/bayes3/_design/bayes/_view/content_by_dataset',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        },
        selectContentByDataset: function (dataset) {
            return $http(
                {
                    method: 'GET',
                    url: '/bayes3/_design/bayes/_view/content_by_dataset',
                    params: { 'key' : '"'+dataset+'"' },
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        },
        updateContent: function (contentDocument) {
            return $http(
                {
                    method: 'PUT',                    
                    url: '/bayes3/'+contentDocument._id,
                    data: contentDocument,
                    headers: {
                        "Content-Type": "application/json"                            
                    }
                });
        },
         deleteContent: function (document) {
            return $http(
                {
                    method: 'DELETE',                    
                    url: '/bayes3/'+document._id,
                    params: {
                        "rev": document._rev
                    },                    
                    headers: {
                        "Content-Type": "application/json"                            
                    }
                });
        },
		selectHypothesis: function (dataset) {
            return $http(
                {
                    method: 'GET',
                    url: '/bayes3/_design/bayes/_view/hypothesis_by_dataset',
                    params: { 'key' : '"'+dataset+'"' },
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
		},
        updateHypothesis: function (hDocument) {
            return $http(
                {
                    method: 'PUT',                    
                    url: '/bayes3/'+hDocument._id,
                    data: hDocument,
                    headers: {
                        "Content-Type": "application/json"                            
                    }
                });
        },
        deleteHypothesis: function (hDocument) {
            return $http(
                {
                    method: 'DELETE',                    
                    url: '/bayes3/'+hDocument._id,
                    params: {
                        "rev": hDocument._rev
                    },                    
                    headers: {
                        "Content-Type": "application/json"                            
                    }
                });
        },
		selectLikelihood: function (dataset) {
            return $http(
                {
                    method: 'GET',
                    url: '/bayes3/_design/bayes/_view/likelihood_by_dataset',
                    params: { 'key' : '"'+dataset+'"' },
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        },
        updateLikelihood: function (hDocument) {
            return $http(
                {
                    method: 'PUT',                    
                    url: '/bayes3/'+hDocument._id,
                    data: hDocument,
                    headers: {
                        "Content-Type": "application/json"                            
                    }
                });
        },
        deleteLikelihood: function (hDocument) {
            return $http(
                {
                    method: 'DELETE',                    
                    url: '/bayes3/'+hDocument._id,
                    params: {
                        "rev": hDocument._rev
                    },                    
                    headers: {
                        "Content-Type": "application/json"                            
                    }
                });
        },
        selectLikelihoodcheck: function (dataset) {
            return $http(
                {
                    method: 'GET',
                    url: '/bayes3/_design/bayes/_view/likelihoodcheck_by_dataset',
                    params: { 'key' : '"'+dataset+'"' },
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        },
        updateLikelihoodcheck: function (hDocument) {
            return $http(
                {
                    method: 'PUT',                    
                    url: '/bayes3/'+hDocument._id,
                    data: hDocument,
                    headers: {
                        "Content-Type": "application/json"                            
                    }
                });
        },
        deleteLikelihoodcheck: function (hDocument) {
            return $http(
                {
                    method: 'DELETE',                    
                    url: '/bayes3/'+hDocument._id,
                    params: {
                        "rev": hDocument._rev
                    },                    
                    headers: {
                        "Content-Type": "application/json"                            
                    }
                });
        },
        selectDatum: function (dataset) {
            return $http(
                {
                    method: 'GET',
                    url: '/bayes3/_design/bayes/_view/datum_by_dataset',
                    params: { 'key' : '"'+dataset+'"' },
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        },
        updateDatum: function (hDocument) {
            return $http(
                {
                    method: 'PUT',                    
                    url: '/bayes3/'+hDocument._id,
                    data: hDocument,
                    headers: {
                        "Content-Type": "application/json"                            
                    }
                });
        },
        deleteDatum: function (hDocument) {
            return $http(
                {
                    method: 'DELETE',                    
                    url: '/bayes3/'+hDocument._id,
                    params: {
                        "rev": hDocument._rev
                    },                    
                    headers: {
                        "Content-Type": "application/json"                            
                    }
                });
        }
    }
  });
