import documentService from '../services/document.service.js';


export default {
  createDocument,
  getDocumentsByUser,
  deleteDocument,
}

async function createDocument(req, res) {

  const { id } = req.params;
  const document = await documentService.createDocument(Number(id), req.file, req.body);

  if (document.error) {
    return res.status(400).json({ error: document.error });
  }

  res.json(document);
};

async function getDocumentsByUser(req, res) {
  const { id } = req.params;

  const documents = await documentService.getDocumentsByUser(Number(id));

  if (documents.error) {
    return res.status(400).json({ error: documents.error });
  }

  res.json(documents);
}

async function deleteDocument(req, res) {
  const { id } = req.params;
  const { documentId } = req.params;
  const document = await documentService.deleteDocument(Number(id), Number(documentId));

  if (document.error) {
    return res.status(404).json({ error: document.error });
  }

  res.json(document);
};
