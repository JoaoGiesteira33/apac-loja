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
    let fields = req.query.select
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
// campo select é reservado para a seleção de campos
function extractFilters(req, res, next) {
    let { select, page , limit, expand, token, ...filters } = req.query || {}
    // Para cada filtro que é objeto, adicionar um $ ao início
    for (let i in filters) {
        if (typeof filters[i] === 'object') {
            for (let j in filters[i]) {
                filters[i]["$" + j] = filters[i][j]
                delete filters[i][j]
            }
        }
    }
    
    req.filters = filters
    next()
}


module.exports = {fieldSelector, extractFilters}