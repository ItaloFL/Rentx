# Cadastro de carro



**RF**

    Deve ser possivel cadastrar um novo carro
    Deve ser possivel listar todas as categorias

**RN**

    Não deve ser possivel cadastrar um carro em que a placa ja exista no sistema.
    Não deve ser possivel alterar a placa de um carro ja cadastrado
    O carro deve ser cadastrado com disponibilidade por padrão
    O Usuario responsavel pelo cadastro tem de ser um usuario administrador.


 # Listagem de carros

**RF**
    Deve ser possivel listar todos os carros disponiveis
    Deve ser possivel listar os carros pelo nome da Categoria
    Deve ser possivel listar os carros pelo nome da Marca
    Deve ser possivel listar os carros pelo nome do carro  

**RN**
    O Usuario não precisa estar logado no sistema


 # Cadastro de Especificação no carro

**RF**

    Deve ser possivel cadastrar uma especificação para o carro
    Deve ser possivel listar todas as especificações
    Deve ser possivel listar todos os carros



**RN**

    Não deve ser possivel cadastrra uma especificação para um carro não cadastrado
    Não deve ser possivel cadastrar uma especificação ja existente para o mesmo carro
    O Usuario responsavel pelo cadastro tem de ser um usuario administrador.

 # Cadastro de imagens do carro


**RF**

    Deve ser possivel cadastrar a imagem do carro
    Deve ser possivel listar todos os usuarios

**RNF**

    Ultilizar o multer para upload da imagem

**RN**

    O Usuario deve poder cadastrar mais de uma imagem para o mesmo carro
    O Usuario responsavel pelo cadastro tem de ser um usuario administrador.



# Aluguel de carro


**RF**
    
    Deve ser possivel cadastrar um alguel

**RNF**


**RN**

    O aluguel deve ter duração minima de 24 horas
    Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuario
        Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro
