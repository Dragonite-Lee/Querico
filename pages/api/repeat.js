import prisma from "@/lib/prismadb"

export default async function handler(request, response) {

    if (request.method == 'POST') {
        try {
            if (!request.body.email) {
                return response.status(400).json("이메일을 입력해 주세요")
            }

            const user = await prisma.user.findUnique({
                where: {
                    email: request.body.email
                }
            })
            // console.log(user)
            if (user) {
                const provider = await prisma.account.findUnique({
                    where: {
                        userId: user?.id
                    }
                })

                if (provider.provider === 'naver') {
                    return response.status(200).json({status: true, message: "네이버로 가입된 이메일 입니다"});
                } else if (provider.provider === 'credentials') {
                    return response.status(200).json({status: true, message: "이미 가입된 이메일 입니다"});
                }
            }
             
            return response.status(200).json(false);

        } catch (error) {
            console.log(Error, 'SERVER_ERROR');
            return response.status(500).json("Internal Error", { status: 500 });
        }
    }
}