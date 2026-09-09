// Importando o arquivo de configuração do banco de dados
// Esse arquivo contém a função responsável por executar comandos SQL
var database = require("../database/config");

// Função que verifica se existe um usuário cadastrado com o email e senha informados
function autenticarEmpresa(email, senha)
{
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticarUsuario(): ", email, senha)
    
    // Select que busca o usuário que possui o email e senha informados no login
    var instrucaoSql = `
        SELECT
        id_usuario AS id,
        u.nome_usuario AS nome,
        u.email_usuario AS email,
        p.objetivo_pilates AS objetivo,
        p.genero_musical AS genero
        FROM usuario u
        LEFT JOIN preferencia_usuario p ON u.id_usuario = p.fk_usuario
        WHERE u.email_usuario = '${email}' AND u.senha_usuario = '${senha}';
    `;

    // O LEFT JOIN foi usado para que o usuário consiga fazer login mesmo sem preferências cadastradas

    // Exibe a query montada no terminal
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    // Executa a query no banco e retorna o resultado
    return database.executar(instrucaoSql);
}




// Função que cadastra um novo usuário
function cadastrarEmpresa(razao_social, cnpj, telefone, cep, cidade, logradouro, bairro, numero)
{
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarUsuario():", razao_social, cnpj, telefone, cep, cidade, logradouro, bairro, numero);
    
    // Insert que insere um novo usuário na tabela usuario
    var instrucaoSql = `
        INSERT INTO empresa(razao_social, cnpj, telefone_comercial, cep, cidade, logradouro, bairro, numero) VALUES
        ('${razao_social}', '${cnpj}', '${telefone}', '${cep}', '${cidade}', '${logradouro}', '${bairro}', '${numero}');
    `;

    // Exibe a query montada no terminal
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    // Executa a query no banco e retorna o resultado
    return database.executar(instrucaoSql);
}




// Função responsável por buscar os dados de um usuário
function visualizarEmpresa(fkUsuario)
{
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >>Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function visualizarUsuario():", fkUsuario)

    // Select que busca os dados de um usuário pelo seu id
    var instrucaoSql = `
        SELECT
        nome_usuario,
        DATE_FORMAT(dt_nasc_usuario, '%d/%m/%Y') AS dt_nasc_usuario,
        email_usuario,
        senha_usuario
        FROM usuario
        WHERE id_usuario = ${fkUsuario};
    `;
    
    // DATE_FORMAT utilizado para formatar a data no formato DD/MM/AAAA

    // Exibe a query montada no terminal
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    // Executa a query no banco e retorna o resultado
    return database.executar(instrucaoSql);
}






// Exportando as funções do model
// Outros arquivos podem usar essas funções
module.exports = {
    //autenticarEmpresa,
    cadastrarEmpresa,
    //visualizarEmpresa
};