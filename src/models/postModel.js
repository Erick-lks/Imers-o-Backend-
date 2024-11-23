import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";
import "dotenv/config";

// Estabelece a conexão com o banco de dados MongoDB usando a string de conexão obtida da variável de ambiente STRING_CONEXAO
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts em uma coleção específica
export async function getTodosPosts() {
  // Obtém o banco de dados "imersao-instabyte" da conexão estabelecida
  const db = conexao.db("imersao-instabyte");
  // Obtém a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Executa uma consulta para encontrar todos os documentos na coleção e retorna os resultados como um array
  return colecao.find().toArray();
}

// Função assíncrona para criar um novo post em uma coleção específica
export async function criarPost(novoPost) {
  // Obtém o banco de dados "imersao-instabyte" da conexão estabelecida
  const db = conexao.db("imersao-instabyte");
  // Obtém a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Insere um novo documento (post) na coleção e retorna um objeto com informações sobre a inserção
  return colecao.insertOne(novoPost);
}


export async function atualizarPost(id , novoPost) {
  // Obtém o banco de dados "imersao-instabyte" da conexão estabelecida
  const db = conexao.db("imersao-instabyte");
  // Obtém a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");

  const objetId = ObjectId.createFromHexString(id)
  // Insere um novo documento (post) na coleção e retorna um objeto com informações sobre a inserção
  return colecao.updateOne({_id: new ObjectId(objetId)}, {$set:novoPost});
}
