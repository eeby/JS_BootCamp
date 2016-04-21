import {appModule} from "./appModule";

export class ClockComponent {
    onTick: any;
    format: string;
    time: Date;
    intervalId: any;

    constructor(private $interval){
        this.run();
    }

    run(){
        var self = this;
        self.time = new Date();
        self.intervalId = self.$interval(function() {
            self.time = new Date();

            self.onTick({sender: self, time: self.time});
        }, 1000);
    }

}



appModule.component('clock1', {
    controller: ClockComponent,
    templateUrl: "./templates/clockTemp.html",
    bindings: {
        format: "<",
        onTick: "&"
    }
});

appModule.component('clock2', {
    controller: ClockComponent,
    templateUrl: "./templates/clockTemp.html",
    bindings: {
        format: "<",
        onTick: "&"
    }
});