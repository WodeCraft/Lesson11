import {Router} from 'aurelia-router'; 

export class App { 
    static inject() { return [Router]; } 
    
    constructor(router) { 
        this.router = router; 
        this.router.configure(config => { 
            config.title = 'MyBooks'; 
            config.map([ 
                { route: ['','start'], moduleId: 'start', nav: true, title:'Aurelia' }, 
                { route: ['books','books'], moduleId: 'books', nav: true, title:'Books' }, 
                { route: 'books/:id', name: 'booksList', moduleId: 'books', nav: false, title: 'Edit' } 
            ]); 
        }); 
    } 
    message = 'Hello from Aurelia'; 
}