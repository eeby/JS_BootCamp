module myApp {

    class AppCtrl {
        num:string;

        constructor(private calcService:CalcService) {
        }

        calc() {
            var num1:number = parseInt(this.num1);
            var num2:number = parseInt(this.num2);

            if (isNaN(num1) || isNaN(num2)) {
                return;
            }

            this.num = this.calcService.calc(num1, num2, this.opr) + "";
            this.num1 = this.num2 = this.opr = '';
        }

        getVal(val) {
            if(!this.num){
                this.num = val;
            }
            else{

                this.num = this.num + '' + val;
            }

        }

        getOperand(opr){
            this.num1 = this.num;
            this.num = '';
            this.opr = opr;
        }

        getSum(){
            this.num2 = this.num;
            this.calc();
        }
    }

    angular.module("myApp").controller("AppCtrl", AppCtrl);
}
