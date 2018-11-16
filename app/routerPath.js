const Router = require("koa-router")
const router = new Router();
const PathLib = require("./pathLib")
function routerLib(){
    for(let item in PathLib){
        if(item.startsWith("GET")){
            let path = item.substr(4);
            router.get(`/${path}`,PathLib[item])
        }else{
            let path = item.substr(5);
            router.post(`/${path}`,PathLib[item])
        }
    }
}
module.exports = function(){
    routerLib()
    return router.routes()
}