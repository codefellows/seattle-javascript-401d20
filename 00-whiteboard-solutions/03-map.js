let map = (callback, collection) => {
    let result = []
    for(let i=0; i<collection.length; i++){
        result.push(callback(collection[i], i, collection))
    }
    return result 
}
