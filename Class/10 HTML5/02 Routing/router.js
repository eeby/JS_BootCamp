(function() {
    //
    //  private state
    //
    var routes = {};
    var currentRoute = null;

    $(document).ready(onInit);
    window.addEventListener("popstate", onPopState);

    function onInit() {
        //
        //  The initial state is null be default
        //  We use replaceState to both change the initial URL
        //  and set an initial state
        //
        var defaultElement = $("[data-default]");
        if(defaultElement.length) {
            var defaultUrl = defaultElement.attr("data-url");
            if(defaultUrl) {
                navigate(defaultUrl, "replace");
            }
        }
    }

    function onPopState(e) {
        console.log(e);

        //
        //  e.state will never be null since we are setting it
        //  at application load
        //

        //
        //  Navigate without changing the URL
        //
        navigate(e.state.url, "none");
    }

    //
    //  functions
    //
    function register(url, element) {
        routes[url] = {
            url: url,
            element: element,
        };

        console.log(routes);
    }

    function navigate(url, mode) {
        if(mode === undefined) {
            mode = "push";
        }

        var route = routes[url];
        if(!route) {
            return;
        }

        if(currentRoute) {
            currentRoute.element.removeClass("active");
        }

        currentRoute = route;
        currentRoute.element.addClass("active");

        if(mode == "push") {
            window.history.pushState({
                url: currentRoute.url,
            }, null, currentRoute.url);
        }
        else if(mode == "replace") {
            window.history.replaceState({
                url: currentRoute.url,
            }, null, currentRoute.url);
        }
        else {
            //
            //  Do nothing
            //
        }
    }
    
    //
    //  Public API
    //
    angular.module("MyApp").value("router", {
        register: register,
        navigate: navigate,
    });
})();

