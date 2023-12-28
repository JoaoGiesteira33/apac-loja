
function flatten(fields) {
    let result = []
    for (let i in fields) {
        let field = fields[i]
        let splitted = field.match(/(.*?)(?:\((.*)\))/)
        if (splitted != null) {
            let children = flatten(splitted[2].match(/([^,()]+)(\(.*\))?/g))
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
        let obj = {}
        for (let i in flatFields) {
            obj[flatFields[i]] = 1
        }
        req.fields = obj
    }
    next()
}

// Serve para poder passar valores de filtros, para pesquisas
// Exemplo: /artist?nome=joao&idade=18
// campo fields é reservado para a seleção de campos
function extractFilters(req, res, next) {
    let { fields, page, ...filters } = req.query || {}
    req.filters = filters
    next()
}


module.exports = {fieldSelector, extractFilters}