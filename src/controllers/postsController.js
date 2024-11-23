import { getTodosPosts, criarPost, atualizarPost   } from "../models/postModel.js";
import fs from 'fs'
import gerarDescricaoComGemini from "../services/geminiService.js";


// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
  try {
    // Chama a função getTodosPosts do modelo para buscar todos os posts
    const posts = await getTodosPosts();
    // Retorna os posts em formato JSON com status 200 (sucesso)
    res.status(200).json(posts);
  } catch (error) {
    // Em caso de erro, retorna uma mensagem de erro e status 500 (erro interno do servidor)
    res.status(500).json({ error: "Erro ao obter os posts" });
  }
}

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
  // Obtém os dados do novo post do corpo da requisição
  const novoPost = req.body;

  try {
    // Chama a função criarPost do modelo para inserir o novo post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Retorna o post criado em formato JSON com status 200 (sucesso)
    res.status(200).json(postCriado);
    console.log("Deu certo esta criado! "); // Mensagem de log para confirmar a criação do post
  } catch (error) {
    // Em caso de erro, registra o erro no console e retorna uma mensagem de erro
    console.error(error.message);
    res.status(500).json({ "Error ": "Não foi possível criar o novo post !!" });
  }
}

// Função assíncrona para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
  // Cria um objeto com os dados do novo post, incluindo o nome do arquivo da imagem
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };

  try {
    // Chama a função criarPost para inserir o novo post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Cria um novo nome de arquivo com o ID do post inserido
    const imagemAtualizada = `uploads/${postCriado.insertedId}.jpg`;
    // Renomeia o arquivo da imagem para o novo nome
    fs.renameSync(req.file.path, imagemAtualizada);
    // Retorna o post criado em formato JSON com status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch (error) {
    // Em caso de erro, registra o erro no console e retorna uma mensagem de erro genérica
    console.error(error.message);
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
}



export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.jpg`


  try {
const imageBuffer = fs.readFileSync(`uploads/${id}.jpg`)
const descricao =  await gerarDescricaoComGemini(imageBuffer)

const post = {
  imgUrl: urlImagem,
  descricao: descricao,
  alt: req.body.alt
}
  
      const postCriado = await atualizarPost(id , post);
      res.status(200).json(postCriado);
      
   

    res.status(200).json(postCriado);

  } catch(erro) {
      console.error(erro.message);
      res.status(500).json({"Erro":"Falha na requisição"});
  }}