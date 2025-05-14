module.exports.sendResponse =(res,statusCode,msg,data)=>{
try {
    res.status(statusCode);
    return res.send({
        statusCode:statusCode,
        message:msg,
        data
    })
    
} catch (error) {
    res.status(statusCode);
    return res.send({
        statusCode:statusCode,
        message:msg,
        data
    }) 
}
} 