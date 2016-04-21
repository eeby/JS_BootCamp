module myApp {

    class AppCtrl {
        num1:string;
        num2:string;
        result:string;

        constructor(private calcService:CalcService) {
        }

        calc() {
            var num1:number = parseInt(this.num1);
            var num2:number = parseInt(this.num2);

            if (isNaN(num1) || isNaN(num2)) {
                return;
            }

            this.result = this.calcService.calc(num1, num2) + "";
        }
    }

    angular.module("myApp").controller("AppCtrl", AppCtrl);
}
