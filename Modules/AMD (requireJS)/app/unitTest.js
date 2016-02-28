/**
 * Created by elibe on 28/02/2016.
 */

define(['./serviceLocator'], function (serviceLocator) {

    serviceLocator.register('console', console);

    console.log(serviceLocator.resolve('console'));

});

