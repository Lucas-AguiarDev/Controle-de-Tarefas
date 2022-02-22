//Iportação dos plugins para o SQLite
import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

//-----------------------------------------------//

const database_name = "Tarefas.db"; //Nome do banco de dados
const database_version = "1.0"; //Versão do banco de dados
const database_displayname = "Lista de Tarefas"; //Nome de exibição do banco de dados
const database_size = 200000; //tamanho do banco de dados

//-----------------------------------------------//

export default class TarefaDatabase {

    //Abertura do BD
    Conectar() {
        let db;
        return new Promise((resolve) => {
            console.log("Checando a integridade do plugin ...");
            SQLite.echoTest().then(() => {
                console.log("Integridade Ok ...");
                console.log("Abrindo Banco de Dados ...");
                SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB => {
                    db = DB;
                    console.log("Banco de dados Aberto");
                    db.executeSql('SELECT 1 FROM Tarefa LIMIT 1').then(() => {
                        console.log("O banco de dados está pronto ... Executando Consulta SQL ...");
                    }).catch((error) => {
                        console.log("Erro Recebido: ", error);
                        console.log("O Banco de dados não está pronto ... Criando Dados");
                        db.transaction((tx) => {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Tarefa (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao VARCHAR(150), validade DATE, prioridade VARCHAR(10), status VARCHAR(15))');
                        }).then(() => {
                            console.log("Tabela criada com Sucesso");
                        }).catch(error => {
                            console.log(error);
                        });
                    });
                    resolve(db);
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log("echoTest Falhou - plugin não funcional");
            });
        });
    };

    //-----------------------------------------------//

    //Encerramento do BD
    Desconectar(db) {
        if (db) {
            console.log("Fechando Banco de Dados");
            db.close().then(status => {
                console.log("Banco de dados Desconectado!!");
            }).catch(error => {
                this.errorCB(error);
            });
        } else {
            console.log("A conexão com o banco não está aberta");
        }
    };

    //-----------------------------------------------//

    //Listar itens da tabela
    Listar() {
        return new Promise((resolve) => {
            const lista = [];
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para listar os dados da tabela   
                    tx.executeSql('SELECT * FROM Tarefa', []).then(([tx, results]) => {
                        console.log("Consulta completa");
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            const { id, descricao, validade, prioridade, status } = row;
                            lista.push({ id, descricao, validade, prioridade, status });
                        }
                        console.log(lista);
                        resolve(lista);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    //-----------------------------------------------//

    //Buscar os dados de um produto específico pelo id 
    productById(id) {
        console.log(id);
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para buscar as informações do produto     
                    tx.executeSql('SELECT * FROM Tarefa WHERE id = ?', [id]).then(([tx, results]) => {
                        console.log(results);
                        if (results.rows.length > 0) {
                            let row = results.rows.item(0);
                            resolve(row);
                        }
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    //-----------------------------------------------//

    //Acrescentar um novo produto na tabela
    Inserir(tarefa) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para inserir um novo produto   
                    tx.executeSql('INSERT INTO Tarefa (descricao, validade, prioridade, status) VALUES (?, ?, ?, ?)', [tarefa.descricao, tarefa.validade, tarefa.prioridade, tarefa.status]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    //-----------------------------------------------//

    //Atualizar um dado que já foi escrito anteriormente no banco de dados a partir da sua id
    Atualizar(id) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para atualizar um dado no banco        
                    tx.executeSql("UPDATE Tarefa SET status = 'Concluido' WHERE id = ?", [id]).then(([tx, results]) => {
                        resolve(results);        
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    //-----------------------------------------------//

    //Excluir um dado do banco pela id
    Remover(id) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para deletar um item da base de dados    
                    tx.executeSql('DELETE FROM Tarefa WHERE Id = ?', [id]).then(([tx, results]) => {
                        console.log(results);
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

}
