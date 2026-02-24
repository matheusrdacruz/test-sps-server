import prisma from '../prisma/client.js';
import fs from 'fs/promises';
import path from 'path';

export default {
  createDocument,
  getDocumentsByUser,
  deleteDocument
};


async function getDocumentsByUser(id) {
  try {
    const documents = await prisma.document.findMany({
      where: { userId: id }
    });
    return documents;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

async function createDocument(userId, file, body) {

  const filePath = `uploads/documents/${file.filename}`;
  const data = {
    name: body.name,
    description: body.description,
    userId,
    file: filePath
  };

  try {
    const document = await prisma.document.create({ data });
    return document;
  } catch (error) {
    return { error };        
  }
};

async function deleteDocument(userId, documentId) {
  try {
    const document = await prisma.document.findFirst({
      where: { id: documentId, userId: userId }
    });

    if (!document) {
      return { error: "Documento não encontrado" };
    }

    await deleteDocumentFile(document.file);

    await prisma.document.delete({
      where: { id: documentId, userId: userId }
    });

    return { message: "Documento deletado com sucesso!" };
  } catch (error) {
    return { error: error.message };
  }
};

async function deleteDocumentFile(documentUrl) {
  if (!documentUrl) return;

  try {
    // transforma /files/documents/xxx.pdf
    // em uploads/documents/xxx.pdf
    const relativePath = documentUrl.replace('/files', 'uploads');

    const filePath = path.join(process.cwd(), relativePath);

    await fs.unlink(filePath);

    console.log('Documento antigo deletado com sucesso');
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Erro ao deletar documento:', error);
    }
  }
}