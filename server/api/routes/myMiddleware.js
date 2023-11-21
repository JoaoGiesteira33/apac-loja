
function flatten(fields) {
    let result = []
    for (let i in fields) {
        let field = fields[i]
        let splitted = field.match(/(.*?)(?:\((.*)\))/)
        if (splitted != null) {
            let children = flatten(splitted[2].match(/([^,()]+)(\(.*\))?/g))
            console.log(children)
            for (let j in children){
                let child = children[j]
                result.push(splitted[1] + "." + child)
            }
        }
        else {
            result.push(field)
        }
    }
    return result
}

function fieldSelector(req, res, next) {
    let fields = req.query.fields
    if (fields) {
        flatFields = flatten(fields.match(/([^,()]+)(\(.*\))?/g))
        req.fields = flatFields
    }
    next()
}


module.exports = fieldSelector