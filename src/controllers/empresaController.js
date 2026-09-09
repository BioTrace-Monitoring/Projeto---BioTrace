// Importando o empresaModel
var empresaModel = require("../models/empresaModel");

// Função que cadastra uma nova empresa
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
        res.status(400).send("Razão Social está undefined!");
    }

    else if (cnpj == undefined)
    {
        res.status(400).send("Seu CNPJ está undefined!");
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

                    // Retorna o resultado para o front-end em formato JSON
                    res.json(resultado);
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
    // model faz INSERT e banco salva a empresa
    // resultado volta pro controller
    // controller envia resultado pro front
}

function visualizarEmpresa(req, res)
{
    // req -> requisição: Possui todas as informações da requisição
    // res -> resposta: Retornar uma resposta pro usuario


    // Chama a função do model que executa o SELECT no banco
    empresaModel.visualizarEmpresa()
        .then(
            function(resultado)
            {
                // Verifica se algum registro foi encontrado
                if (resultado.length > 0)
                {
                    // Retorna os dados encontrados em JSON
                    res.json(resultado);
                }
                
                else
                {
                    res.status(204).send("Nenhuma empresa encontrada!")
                }
            }
        )
        // Executado caso erro na consulta
        .catch(
            function(erro)
            {
                console.log(erro);

                console.log(
                    "\nHouve um erro ao listar as empresas! Erro: ",
                    erro.sqlMessage
                );

                res.status(500).json(erro.sqlMessage);
            }
        );

    // FLUXO:
    // front solicita os dados
    // controller recebe a requisição
    // model faz SELECT e banco retorna dados
    // controller verifica se encontrou registros
    // controller envia resultado pro front
}



// Exportando as funções do controller
// Outros arquivos podem usar essas funções
module.exports =
{
    cadastrarEmpresa,
    visualizarEmpresa
}