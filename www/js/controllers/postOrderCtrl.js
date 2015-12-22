angular.module('starter.controllers')

    .controller('postOrderCtrl', function($scope, $http, $stateParams,CartData,StoreData, $ionicPopup) {
        $scope.order= JSON.parse(window.localStorage['orderPost'] || '{}');
        $scope.orderId=$stateParams.orderId;

        $scope.feedbackData={
            "timelyDeliver":0,
            "quality":1,
            "rating":3
        }

        $scope.timelyDeliverStatus="Yes";
        $scope.productQualityStatus="Awesome";

        $scope.commentData=function(){
            $scope.order.feedback = $scope.feedbackData;
            console.log($scope.order);
            console.log($scope.feedbackData);
        };

        $scope.showPopup = function() {
            var promptPopup=$ionicPopup.prompt({
                title: 'Comment',
                template: 'Comment Here',
                inputType:'textbox',
                inputPlaceholder:'Type your comment here'

            });
            promptPopup.then(function(res) {
                if(res) {
                    $scope.commentData();
                    $scope.makePopup();

                } else {
                    console.log('You are not sure');
                }
            });
        };

        $scope.sendFeedback = function() {
            console.log($scope.feedbackData)

            $http({
                method: 'PUT',
                url: 'http://getmeher.com:3000/orders/'+$scope.orderId,
                //headers: {
                //    'Content-Type': 'application/json'
                //},
                data:{feedback:$scope.feedbackData}
            })
                .then(function successCallback(response) {
                console.log(response);
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server return s response with an error status.

            console.log($scope.feedbackData);
            $scope.makePopup();

        };

            $scope.makePopup = function() {
            var promptPopup=$ionicPopup.confirm({
                title: 'Comment',
                template: 'Your feedback is sent',


            });
            promptPopup.then(function(res) {
                if(res) {
                    // console.log($scope.commit());
                    //$scope.comment();
                } else {
                    console.log('You are not sure');
                }
            });
        };

        $scope.changeDeliveryTime=function(u){

            if(u==true)
            {
                $scope.timelyDeliverStatus="Yes";
            }
            else{
                $scope.timelyDeliverStatus="No";
            }
        };

        $scope.changeProductQuality=function(a){
            if(a==true)
            {
                $scope.productQualityStatus="Awesome";
            }
            else{
                $scope.productQualityStatus="Average";
            }
        }

        $scope.buttonClicked = function(index){
            $scope.selectedIndex = index;
            $scope.$apply();
        }

        $scope.cartItems = CartData.getCart();
        $scope.StoreSelected = StoreData.getStore();
        $scope.CallTel = function(tel) {
            window.open('tel:'+'+91'+tel)
            //window.location.href = 'tel:'+ tel;
        }


        $scope.timelyDeliveryButton = function(index){
            debugger

            $scope.onTime=index;
            console.log($scope.onTime);
            $scope.$apply();
            $scope.feedbackData.timelyDeliver = $scope.onTime;
        }
        $scope.productQualityButton = function(index){
            debugger

            $scope.productQuality = index;
            console.log($scope.productQuality);
            $scope.$apply();
            $scope.feedbackData.quality = $scope.productQuality;
        }

    });
