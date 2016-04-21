class CalcService {
    calc(num1: number, num2: number, opr: string) {
        switch (opr){
            case '+':
                var res = num1 + num2;
                return res;
            case '-':
                var res = num1 - num2;
                return res;
        }

    }

}

angular.module("myApp").service("calcService", CalcService);

