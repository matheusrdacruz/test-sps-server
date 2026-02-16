import prisma from '../prisma/client.js';
import bcrypt from "bcryptjs";

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};

export async function createUser(newUser) {
  const hashedPassword = await bcrypt.hash(newUser.password, 12);
  try {
    const result = await validateUser(newUser);
    if (result.error) {
      return result;
    }
    const user = await prisma.user.create({
      data: {
        ...newUser,
        password: hashedPassword
      }
    });

    return user;
  } catch (error) {
    return { error };        
  }
};

export async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
};

export async function getUser(field, value) {
  const user = await prisma.user.findUnique({
    where: { [field]: value }
  });

  if (!user) return { error: "Usuário não encontrado." };

  return user;
};

export async function updateUser(id, data) {
  try {
    const result = await validateUpdateUser(id, data);
    if (result.error) {
      return result;
    }

    let user = await getUser("id", id);
    if (user.error) {
      return user;
    }

    user = await prisma.user.update({
      where: { id },
      data
    });

    return user;
  } catch (error) {
    return { error: error.message };
  }
};

export async function deleteUser(id) {
  try {
    await prisma.user.delete({
      where: { id }
    });

    return { message: "Usuário deletado com sucesso!" };
  } catch (error) {
    return { error: error.message };
  }
};

async function validateUser(newUser) {
  if (!newUser.name || !newUser.email || !newUser.type || !newUser.password) {
    return { error: "Campos obrigatórios não preenchidos." };
  }

  let user = await getUser("email", newUser.email);
  if (!user.error) {
    return { error: "O endereço de e-mail já está registrado." };
  }
  // Se o campo type for um enum, adicionar a validação
  return { error: null };
}

async function validateUpdateUser(id, data) {
  if (!data.name || !data.email || !data.type) {
    return { error: "Campos obrigatórios não preenchidos." };
  }

  let user = await prisma.user.findFirst({
    where: { email: data.email, id: { not: id } }
  });
  if (user) {
    return { error: "O endereço de e-mail já está registrado." };
  }
  // Se o campo type for um enum, adicionar a validação
  return { error: null };
}