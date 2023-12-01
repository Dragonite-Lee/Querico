import bcrypt from "bcrypt"

import prisma from "@/lib/prismadb"

export default async function handler(request, response) {
    if (request.method == 'POST') {
  
        if (!request.body.email || !request.body.name || !request.body.password) {
            response.status(400).json("email, name, password를 입력해 주세요")
        }

        const hashedPassword = await bcrypt.hash(request.body.password, 12);
            
        try {
            const user = await prisma.user.create({
                data: {
                    "email": request.body.email,
                    "name": request.body.name,
                    "hashedPassword": hashedPassword
                }
            });
    
            response.status(200).json(user);
        } catch (error) {
            console.log(Error, 'REGISTRATION_ERROR');
            response.status(500).json("Internal Error", { status: 500 });
        }
    }
}