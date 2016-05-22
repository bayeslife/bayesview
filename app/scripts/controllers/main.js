'use strict';

/**
 * @ngdoc function
 * @name bayesview3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bayesview3App
 */
angular.module('bayesview3App')
  .controller('ProblemsCtrl', function ($scope,$routeParams,dataservice,guidservice) {

  	$scope.loadProblems = function() {
  		dataservice.selectContent().success(function(contents){
  			var ps = _.map(contents.rows,function(r){
  				return r.value;
  			});
  			$scope.problems = ps;  			
  		});

        dataservice.selectSession().success(function(sessions){
            sessions.rows.forEach(function(session){
                dataservice.deleteSession(session.value);
            })
        });
  	}

    $scope.addProblem = function(){
        var guid = guidservice.createGuid();

        $scope.selectedProblem = {
           "_id": guid,
           "content": "ChangeMe",
           "entityType" : "pjt.bayesview.datamodel.ProblemContent",
           "datasetId": "ChangeMe"       
        };
        $scope.problems[$scope.problems.length] = $scope.selectedProblem;
    }

    $scope.selectProblem = function(d){
        $scope.selectedProblem = d;
    }

    $scope.updateProblem = function(d){
        dataservice.updateContent($scope.selectedProblem).success(function(d){
            $scope.loadProblems();
        })      
    }

    $scope.removeProblem = function(problem){   

        var dataset = problem.datasetId;  
        dataservice.selectContentByDataset(problem.datasetId).success(function (data) {
               var contentDocument = data.rows[0].value;
                              
                dataservice.selectLikelihood(dataset).success(function (data) {                    
                    var ps = _.map(data.rows,function(r){ return r.value; });
                    ps.forEach(function(doc){
                        dataservice.deleteLikelihood(doc);
                    });

                    dataservice.selectHypothesis(dataset).success(function (data) {
                        var ps = _.map(data.rows,function(r){ return r.value; });
                        ps.forEach(function(doc){
                            dataservice.deleteHypothesis(doc);
                        }); 

                        dataservice.selectLikelihoodcheck(dataset).success(function (data) {
                            var ps = _.map(data.rows,function(r){ return r.value; });
                            ps.forEach(function(doc){
                                dataservice.deleteLikelihoodcheck(doc);
                            });  
                            dataservice.selectDatum(dataset).success(function (data) {
                                var ps = _.map(data.rows,function(r){ return r.value; });
                                ps.forEach(function(doc){
                                    dataservice.deleteDatum(doc);
                                });                                           
                                dataservice.deleteContent(problem).success(function(d){
                                    $scope.loadProblems();
                                });
                            });
                        });
                    });
                });
            });            
    }


  	$scope.loadProblems();

    
  })
  .controller('ProblemCtrl', function ($scope,$routeParams,dataservice,guidservice) {
    
    $scope.dataset = $routeParams.dataset;

  	$scope.updateModel = function(){
            var dataset = $scope.dataset;
            dataservice.selectContentByDataset(dataset).success(function (data) {
               $scope.contentDocument = data.rows[0].value;
               var contentDoc = $scope.contentDocument;
               var ps = _.map(data.rows,function(r){ return r.value; });
  				$scope.problem = ps[0];  			
            	dataservice.selectLikelihood(dataset).success(function (data) {                    
                    if(data.rows.length==0){
                        $scope.setupLikelihood();
                    }else {
                        var ps = _.map(data.rows,function(r){ return r.value; });
                        $scope.likelihood = ps[0];
                    }
                });
            	dataservice.selectHypothesis(dataset).success(function (data) {
            		var ps = _.map(data.rows,function(r){ return r.value; });
                    $scope.hypothesis = ps;
                });
            	dataservice.selectLikelihoodcheck(dataset).success(function (data) {
            		var ps = _.map(data.rows,function(r){ return r.value; });
                    $scope.likelihoodchecks = ps;
                });
            	dataservice.selectDatum(dataset).success(function (data) {
            		var ps = _.map(data.rows,function(r){ return r.value; });
            		$scope.datums = ps;
            				                
                    $scope.data = [];

                    $scope.datums.forEach(function(dtm) {
                                            
                        $scope.hypothesis.forEach(function(h){
                            var datum=[]
                            var i=0;
                            var cat=[];
                            dtm.posteriorMap.forEach(function(p){
                                 datum[datum.length]= {shortName: p.data,name: p.data};                                
                                cat[cat.length]={x: i++,y: p.hyp[h.name]};                                                                                                                
                            }); 
                            var catd = { name: h.name ,datum: datum, values: cat};
                            $scope.data.push(catd);    
                                              
                	   });
                    var v = $scope.data;
                    console.log(v);
                    });
                });
                   
            }); 
        };

        //--------------- Content---------------------------
        $scope.updateContent = function (q) {
            dataservice.updateContent($scope.contentDocument).success(function (response) {
                $scope.updateModel($scope.dataset);
                $scope.editContent=false;
            });
        };


        //--------------- Hypothesis---------------------------
        $scope.addHypothesis = function () {
            var identifier = guidservice.createGuid();
            $scope.selectedHypothesis = { _id: identifier, name: 'Change Me',text: 'Change Me', prior: '1',model: {},entityType: 'pjt.bayesview.datamodel.Hypothesis',datasetId : $scope.dataset};
            $scope.editHypothesis=true;
        };

        $scope.deleteHypothesis = function (h) {
            dataservice.deleteHypothesis(h).success(function (response) {
                $scope.updateModel();
            });
        };


        $scope.updateHypothesis = function (q) {

            q.model = angular.fromJson(q.jsonModel);

            dataservice.updateHypothesis(q).success(function (response) {
                $scope.updateModel($scope.dataset);
                $scope.editHypothesis=false;
            });
        };

        $scope.selectHypothesis = function (q) {
            $scope.selectedHypothesis = q;
            q.jsonModel = angular.toJson(q.model,true);
            $scope.editHypothesis=true;
            /*dataservice.selectHypothesisActions(q).success(function (data) {
             $scope.Hypothesisactions = data;
             });
             */
        };


        //--------------- Model---------------------------
        $scope.selectKeyValue = function (hypothesis,value,k,v) {
            $scope.selectedHypothesis=hypothesis;
            $scope.selectedModel = value;
            $scope.model = { key: k,value: v };
            $scope.editModel=true;
        }

        $scope.addKeyValue = function (hypothesis,value) {
            $scope.selectedHypothesis=hypothesis;
            if(value!=null)
                $scope.selectedModel = value;
            else {
                hypothesis.model = {};
                $scope.selectedModel = hypothesis.model;
            }            
            $scope.model = { key: 'Key',value: 'Value' };
            $scope.editModel=true;
        };

        $scope.selectKeyContainer = function (hypothesis,value,k) {
            $scope.selectedHypothesis=hypothesis;
            $scope.selectedModel = value;
            $scope.model = { key: k};
            $scope.editContainer=true;
        }

        $scope.addKeyContainer = function (hypothesis,value) {
            $scope.selectedHypothesis=hypothesis;

            if(value!=null)
                $scope.selectedModel = value;
            else {
                hypothesis.model = {};
                $scope.selectedModel = hypothesis.model;
            }
            $scope.model = { key: 'Key'};
            $scope.editContainer=true;
        };

        $scope.updateKeyValue = function () {
            var sh = $scope.selectedHypothesis;

            $scope.selectedModel[$scope.model.key] = $scope.model.value;
            $scope.editModel=false;
            dataservice.updateHypothesis($scope.selectedHypothesis).success(function (response) {
                $scope.updateModel($scope.dataset);
            });
        };

        $scope.updateKeyContainer = function () {
            var sh = $scope.selectedHypothesis;

            $scope.selectedModel[$scope.model.key] = {};
            $scope.editContainer=false;
            dataservice.updateHypothesis($scope.selectedHypothesis).success(function (response) {
                $scope.updateModel($scope.dataset);
            });
        };

        $scope.deleteKey = function (hypothesis,component,key) {
            delete component[key];
            dataservice.updateHypothesis(hypothesis).success(function (response) {
                $scope.updateModel($scope.dataset);
            });
        };

        //--------------- Likelihood---------------------------

        $scope.setupLikelihood = function () {
            var identifier = guidservice.createGuid();
            $scope.likelihood = $scope.selectedLikelihood = { _id: identifier, expression: 'Change Me',datasetId: $scope.dataset, entityType: 'pjt.bayesview.datamodel.Likelihood' };            
        };


        $scope.selectLikelihood = function () {
            $scope.editLikelihood=true;
        }

        $scope.updateLikelihood = function () {
            dataservice.updateLikelihood($scope.likelihood).success(function (response) {
                $scope.updateModel($scope.dataset);
                $scope.editLikelihood=false;
            });
        };

        //--------------- Test Expression---------------------------

        $scope.setupTestExpression = function () {
            $scope.test = {expression: 'changeme',result:{}};
        };

        $scope.testExpression = function () {
            dataservice.testExpression($scope.test.expression).success(function (response) {
                $scope.test.result = response;
            });
        };

        //--------------- Likelihoodcheck -------

        $scope.addLikelihoodcheck = function () {
            var identifier = guidservice.createGuid();
            $scope.selectedLikelihoodcheck = { _id: identifier, expression: 'Change Me',datasetId: $scope.dataset, entityType: 'pjt.bayesview.datamodel.Likelihoodcheck' };
            $scope.editLikelihoodcheck=true;
        };

        $scope.updateLikelihoodcheck = function (likelihoodcheck) {
            dataservice.updateLikelihoodcheck(likelihoodcheck).success(function (response) {
                $scope.updateModel();
                $scope.editLikelihoodcheck=false;
            });
        };

        $scope.deleteLikelihoodcheck = function (h) {
            dataservice.deleteLikelihoodcheck(h).success(function (response) {
                $scope.updateModel($scope.dataset);
            });
        };

        $scope.selectLikelihoodcheck = function (q) {
            $scope.selectedLikelihoodcheck = q;
            $scope.editLikelihoodcheck=true;
        };

        $scope.updateLikelihoodcheckValues = function () {
            dataservice.updateLikelihoodcheckValues().success(function (response) {
                $scope.updateModel();
            });
        };

        //--------------- Datum -------

        $scope.addDatum = function () {
            var identifier = guidservice.createGuid();
            $scope.selectedDatum = { _id: identifier, order: $scope.datums.length ,expression: 'Change Me', datasetId: $scope.dataset, entityType: 'pjt.bayesview.datamodel.Datum'};
            $scope.editDatum=true;
        };

        $scope.updateDatum = function (datum) {
            dataservice.updateDatum(datum).success(function (response) {
                $scope.updateModel();
                $scope.editDatum=false;
            });
        };

        $scope.deleteDatum = function (h) {
            dataservice.deleteDatum(h).success(function (response) {
                $scope.updateModel();
            });
        };

        $scope.selectDatum = function (q) {
            $scope.selectedDatum = q;
            $scope.editDatum=true;
        };

        $scope.updateDatumValues = function () {
            dataservice.updateDatumValues().success(function (response) {
                $scope.updateModel();
            });
        };


        $scope.checkObject = function(value){
            var t = typeof value;
            return t==='object';
        }

         $scope.computePosterior = function () {

            $scope.datums.forEach(function(datum){             
                    var map = {};  
                    var frequencyMap = {}; 
                    var likelihoodMap = {}; 
                    datum.posteriorMap=[{data: 'Prior',hyp: map, frequency: frequencyMap,likelihood: likelihoodMap}];
                    $scope.hypothesis.forEach(function(hypothesis){
                        map[hypothesis.name] = Number(hypothesis.prior);
                        frequencyMap[hypothesis.name] = Number(hypothesis.prior)*1000;
                        likelihoodMap[hypothesis.name] = Number(hypothesis.prior);
                    });
            });

            $scope.datums.forEach(function(datum){
                var datas= eval(datum.expression); 

                datas.forEach(function(data){

                    var map = {};
                    var frequencyMap = {};
                    var likelihoodMap = {};
                    var prevresult = datum.posteriorMap[datum.posteriorMap.length-1];
                    datum.posteriorMap[datum.posteriorMap.length]={data: data,hyp: map,frequency: frequencyMap,likelihood: likelihoodMap};

                    var total = 0;
                    $scope.hypothesis.forEach(function(hypothesis){

                        var posterior = prevresult.hyp[hypothesis.name];
                        var posteriorFrequency = prevresult.frequency[hypothesis.name];
                                
                        var likelihoodFunction = $scope.likelihood.expression;
                        var h = hypothesis.model;  
                        var hName = hypothesis.name;                          
                        var d = data;
                          
                        var l = eval(likelihoodFunction);

                        var newposterior = posterior*l;
                        var newfrequency = posteriorFrequency*l;

                        map[hypothesis.name] = newposterior;
                        total+=newposterior;

                        frequencyMap[hypothesis.name] = newfrequency;
                        likelihoodMap[hypothesis.name] = l;
                    });
                    $scope.hypothesis.forEach(function(hypothesis){
                        map[hypothesis.name] = map[hypothesis.name]/total;
                    });
                });

                dataservice.updateDatum(datum);
            });
            $scope.updateModel();
    
        };


         $scope.updateLikelihoodcheckValues = function () {
           
            $scope.likelihoodchecks.forEach(function(likelihoodcheck){

                 var likelihoodMap = {};
            
                $scope.hypothesis.forEach(function(hypothesis){

                  var likelihoodFunction = $scope.likelihood.expression;
                  var h = hypothesis.model; 
                  var hName = hypothesis.name;   
                  var exp = likelihoodcheck.expression;
                  var d = eval(exp);
                  
                  var l = eval(likelihoodFunction);

                  likelihoodMap[hypothesis.name] = l;
                });

                likelihoodcheck.likelihoodMap = likelihoodMap;

                dataservice.updateLikelihoodcheck(likelihoodcheck);
            });
            
        };

        $scope.normalizeHypothesis = function () {

            var total = 0;
            $scope.hypothesis.forEach(function(h){
                total += Number(h.prior);
            });

            $scope.hypothesis.forEach(function(h){
                h.prior = h.prior/total;
            });

            $scope.hypothesis.forEach(function(h){
                $scope.updateHypothesis(h);
            });

        };

  	
	$scope.updateModel($scope.dataset);

  });
