/*
//////////////////////////////// SELECIONAR ////////////////////////////////////
SELECT * FROM perguntas;
SELECT * FROM Usuarios;
SELECT * FROM respostas;
SELECT * FROM Feedback;

select *, u.nome from respostas
inner join usuarios as u on u.id = usuario_id 

SELECT
resposta_id,
    CASE
        WHEN resposta_escolhida = resposta_certa THEN true
        ELSE false
    END AS acertou
FROM respostas;



///////////////////////////////// CRIAR //////////////////////////////////////
CREATE TABLE Usuarios(
 id serial PRIMARY KEY NOT NULL,
 nome varchar(40) NOT NULL
);

CREATE TABLE perguntas (
    id serial PRIMARY KEY,
    texto_da_pergunta TEXT NOT NULL,
    opcao_a TEXT NOT NULL,
    opcao_b TEXT NOT NULL,
    opcao_c TEXT NOT NULL,
    resposta_certa CHAR(1) NOT NULL
);

CREATE TABLE respostas(
    resposta_id INT PRIMARY KEY,
    usuario_id INT,
    pergunta_id INT,
    resposta_escolhida VARCHAR(255),
    acertou BOOLEAN,
    FOREIGN KEY (pergunta_id) REFERENCES perguntas(id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id);

CREATE TABLE Feedback (
    feedback_id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    acertos INT,
    erros INT,
    mensagem TEXT
);



///////////////////////////////// INSERIR /////////////////////////////////////
INSERT INTO Usuarios (nome)
VALUES ('Letícia');
INSERT INTO Usuarios (nome)
VALUES ('Lucas');

INSERT INTO perguntas (texto_da_pergunta, opcao_a, opcao_b, opcao_c, resposta_certa)
VALUES ('Qual fabricante de carros é conhecido por seu logotipo de um touro furioso?', 'Bugatti', 'Ferrari', 'Lamborghini', 'c');
INSERT INTO perguntas (texto_da_pergunta, opcao_a, opcao_b, opcao_c, resposta_certa)
VALUES ('Qual marca de refrigerante é famosa e é referida como "a marca da felicidade"?', 'Sprite', 'Pepsi', 'Coca-Cola', 'c');
INSERT INTO perguntas (texto_da_pergunta, opcao_a, opcao_b, opcao_c, resposta_certa)
VALUES ('Qual marca de roupas esportivas é conhecida por seu logotipo de "puma saltando"?', 'Puma', 'Nike', 'Adidas', 'a');
INSERT INTO perguntas (texto_da_pergunta, opcao_a, opcao_b, opcao_c, resposta_certa)
VALUES ('Qual dessas marcas é uma marca de roupa?', 'Pepsi', 'Adidas', 'Starbucks', 'b');

INSERT INTO respostas(resposta_id, usuario_id, pergunta_id, resposta_escolhida) 
VALUES (
    '1',
    (SELECT id FROM Usuarios WHERE nome = 'Letícia'),
    (SELECT id FROM perguntas WHERE texto_da_pergunta = 'Qual dessas marcas é uma marca de roupa?'),
    'b'
);

INSERT INTO Feedback (nome, acertos, erros, mensagem)
VALUES ('NomeDoUsuario', 5, 2, 'Ótimo trabalho, continue praticando!');



///////////////////////////////// FEEDBACK ///////////////////////////////////////////
select  count(p.resposta_certa) as quantidade_acertos,r.usuario_id,u.nome,
case
 when count(p.resposta_certa) <=3 then 'fique atento e continue praticando!!'
 when count(p.resposta_certa) >=4 then 'parabéns, continue se esforçando e chegara longe!!'
else 'tatu da roça'
end as feedback
from perguntas as p
inner join respostas as r on r.pergunta_id = p.id
inner join usuarios as u on u.id = r.usuario_id
where p.resposta_certa = r.resposta_escolhida
group by r.usuario_id,u.nome

*/