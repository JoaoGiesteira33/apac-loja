//função que recebe uma string de campos e retorna um array com os campos parsed
function flatten(fieldString) {
    let fields = fieldString.matchAll(/([^,()]+)(?:\((.*)\))?/g);
    let result = [];
    for (let field of fields) {
        let [_, parent, ...children] = field;
        if (
            children[0] == undefined ||
            children[0] == '' ||
            children.length == 0
        ) {
            result.push(parent);
        } else {
            for (let child of children) {
                let childResult = flatten(child);
                for (let childField of childResult) {
                    result.push(parent + '.' + childField);
                }
            }
        }
    }
    return result;
}

function fieldSelector(req, res, next) {
    let fields = req.query.select;
    if (fields) {
        req.fields = flatten(fields);
    }
    next();
}

// Serve para poder passar valores de filtros, para pesquisas
// Exemplo: /artist?nome=joao&idade=18
// campo select é reservado para a seleção de campos
function extractFilters(req, res, next) {
    let { select, page, limit, expand, token, ...filters } = req.query || {};
    // Para cada filtro que é objeto, adicionar um $ ao início
    for (let i in filters) {
        if (typeof filters[i] === 'object') {
            for (let j in filters[i]) {
                if (j == 'in' || j == 'nin') {
                    filters[i]['$' + j] = filters[i][j].split(',');
                } else {
                    filters[i]['$' + j] = filters[i][j];
                }
                delete filters[i][j];
            }
        }
    }

    req.filters = filters;
    next();
}

function expandExtractor(req, res, next) {
    let expand = req.query.expand;
    if (expand) {
        req.expand = flatten(expand);
    }
    next();
}

module.exports = { fieldSelector, extractFilters, expandExtractor };
