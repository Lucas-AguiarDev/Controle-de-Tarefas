//descrição | validadde | prioridade 

export default class Tarefa
{
    constructor (descricao, validade, prioridade, status)
    {
        this.descricao = descricao;
        this.validade = validade;
        this.prioridade = prioridade;
        this.status = status;
    }
}