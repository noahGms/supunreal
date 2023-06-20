const fileMapper = (file) => ({
  id: file._id,
  originalName: file.originalName,
  name: file.name,
  extension: file.extension,
  size: file.size,
  mimeType: file.mimeType,
  created_at: file.createdAt,
  updated_at: file.updatedAt,
});

export {fileMapper};