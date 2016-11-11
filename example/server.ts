import * as express from 'express'
import {CCController, get, post, docGen, ngSvcGen} from  'ccd'
let app = express()


@ngSvcGen('./client/services', true)
@docGen('./docs')
class HelloCtrl extends CCController{
    @get('/hello')    
    helloWorld(req, res){
        return 'helloWorld'
    }
    @post('/:id')
    update(req, res){
        return 'ajde sega da videme'
    }
    @get('/async')
    helloWorldAsync(req, res){
        return new Promise((resolve)=>{
            setTimeout(function() {
                resolve({value:'hello async'});
            }, 200);
        })
    }

    @get('/async-error')    
    async errorWorldAsync(req, res){
        return await new Promise((resolve, reject)=>{
            setTimeout(function() {
                reject('I just crashed in error world');
            }, 200);
        })
    }
}

const ctrl = new HelloCtrl()
app.use('/', ctrl.router)
app.use('/hello', ctrl.router)
app.listen(3000);