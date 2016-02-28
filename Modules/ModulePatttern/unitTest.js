/**
 * Created by elibe on 28/02/2016.
 */

(function(){
    moudlePattern.serviceLocator.register('console', function(){
        console.log('service console');
    });

    moudlePattern.serviceLocator.resolve('console');

    moudlePattern.serviceLocator.resolve('und');
})
