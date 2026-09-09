// Importando o usuarioModel
var empresaModel = require("../models/empresaModel");


// Função que cadastra um novo user
function cadastrarEmpresa(req, res)
{
    // Recuperando os dados enviados pelo form
    var razao_social = req.body.razaoSocialEmpresaServer;
    var cnpj = req.body.cnpjEmpresaServer;
    var telefone = req.body.telefoneComercialEmpresaServer;
    var cep = req.body.cepEmpresaServer;
    var cidade = req.body.cidadeEmpresaServer;
    var logradouro = req.body.logradouroEmpresaServer;
    var bairro = req.body.bairroEmpresaServer;
    var numero = req.body.numeroEnderecoEmpresaServer;

    // Validando pra que nenhum dado venha vazio
    if (razao_social == undefined)
    {
        res.status(400).send("Seu nome está undefined!");
    }

    else if (cnpj == undefined)
    {
        res.status(400).send("Seu CNPJ de nascimento está undefined!");
    }
    
    else if (telefone == undefined)
    {
        res.status(400).send("Seu telefone comercial está undefined!");
    }
    
    else if (cep == undefined)
    {
        res.status(400).send("Seu CEP está undefined!");
    }

    else if (cidade == undefined)
    {
        res.status(400).send("Sua cidade está undefined!");
    }

    else if (logradouro == undefined)
    {
        res.status(400).send("Seu endereço está undefined!");
    }

    else if (bairro == undefined)
    {
        res.status(400).send("Seu bairro está undefined!");
    }

    else if (numero == undefined)
    {
        res.status(400).send("Seu número está undefined!");
    }
    
    else
    {
        // Chama a função do model que executa o INSERT no banco
        empresaModel.cadastrarEmpresa(razao_social, cnpj, telefone, cep, cidade, logradouro, bairro, numero)
            // Executado quando o cadastro ocorre com sucesso
            .then(
                function (resultado)
                {
                    console.log("Empresa cadastrada!");
                    console.log("ID da empresa:", resultado.insertId);


                    // Retorna o resultado para o front-end em formato JSON
                    res.json({idEmpresa: resultado.insertId});
                }
            // Executado quando tem algum erro durante o cadastro
            ).catch(
                function (erro)
                {
                    console.log(erro); // exibe erro no terminal
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );

                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

    // FLUXO:
    // front envia os dados
    // controller recebe e valida os dados
    // model faz INSERT e banco salva o user
    // resultado volta pro controller
    // controller envia resultado pro front
}




// Exportando as funções do controller
// Outros arquivos podem usar essas funções
module.exports =
{
    cadastrarEmpresa
}