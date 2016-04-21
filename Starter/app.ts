import "./clock"
import {appModule} from "./appModule";
import {ClockComponent} from "./clock";

export class AppComponent {

    constructor(){

    }

    onTick(time) {
        console.log(time);
    }

}



appModule.component("app", {
    controller: AppComponent,
    templateUrl: "./templates/app.html"
});
