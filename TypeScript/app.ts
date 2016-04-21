import "./clock";
import {appModule} from "./appModule";
import {ClockComponent} from "./clock";


export class AppComponent {


    constructor() {

    }


    onTick() {

    }

}


appModule.component("app", {
    controller: AppComponent,
    templateUrl: "./templates/appTemp.html"
});
