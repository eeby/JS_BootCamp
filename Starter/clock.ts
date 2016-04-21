import {appModule} from "./appModule";

export class ClockComponent {
    onTick: any;

    time: Date;
    intervalId: any;

    constructor(private $interval){
        this.run();

    }

    run(){
        this.time = new Date();

        this.intervalId = this.$interval(function() {
            this.time = new Date();
            this.onTick(this.time);
        }, 1000);
    }

}



appModule.component('home', {
    controller: ClockComponent,
    templateUrl: "./templates/clock.html",
    bindings: {
        onTick: '&'
    }
});