let nivel_acesso = sessionStorage.NIVEL_ACESSO;

function verificarNivel()
{
    // Verifica se o usuário logado pertence à BioTrace
    if (nivel_acesso == 'BIOTRACE')
    {
        // Remove a tela destinada aos usuários das empresas clientes
        document.getElementById('container-cliente').remove();

        // Busca as empresas somente para usuários da BioTrace
        visualizarEmpresa();
    }

    else
    {
        // Remove o painel interno de gerenciamento de empresas
        document.getElementById('container-inicio').remove();
    }
}