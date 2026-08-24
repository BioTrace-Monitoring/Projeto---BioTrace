const empresa = document.querySelector('.empresa');
const gestor = document.querySelector('.gestor');

const passoEmpresa = document.querySelector('.passo:nth-child(1)');
const passoGestor = document.querySelector('.passo:nth-child(3)');

empresa.addEventListener('click', function()
{
    passoEmpresa.classList.add('atual');
    passoGestor.classList.remove('atual');

});

gestor.addEventListener('click', function()
{
    passoGestor.classList.add('atual');
    passoEmpresa.classList.remove('atual');

});