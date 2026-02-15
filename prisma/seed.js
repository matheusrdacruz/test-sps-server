import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@spsgroup.com.br";

  const userExists = await prisma.user.findUnique({
    where: { email }
  });

  if (!userExists) {
    const hashedPassword = await bcrypt.hash("1234", 10);

    await prisma.user.create({
      data: {
        name: "admin",
        email: email,
        password: hashedPassword,
        type: "admin"
      }
    });

    console.log("Usuário admin criado!");
  } else {
    console.log("Usuário já existe.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
