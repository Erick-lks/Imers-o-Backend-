// Importa o módulo Express para criar o servidor web
import express from "express";

// Importa o módulo multer para lidar com uploads de arquivos
import multer from "multer";

import cors from "cors"

// Importa funções controladoras de posts do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem , atualizarNovoPost} from "../controllers/postsController.js";



const corsOptions = [
  {
    origin: " http://localhost:8000",
    optionsSuccessStatus : 200 
  }
]
// Configuração do multer para armazenamento de imagens (específico para Windows)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para uploads (no caso, 'uploads/')
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo como o nome original
    cb(null, file.originalname);
  }
});

// Configuração alternativa do multer para Linux/Mac (comentada)
 const upload = multer({ dest: "./uploads", storage });

// Função para definir rotas na aplicação Express
const routes = (app) => {
  // Habilita o middleware express.json para parsing de requests JSON
  app.use(express.json());
app.use(cors(corsOptions))
  // Rota GET para listar todos os posts (tratada pela função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (tratada pela função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa o middleware upload.single("imagem") e a função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função routes para uso em outros arquivos
export default routes;