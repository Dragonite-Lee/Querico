import prisma from "@/lib/prismadb"

export default async function handler(request, response) {
 
    if (request.method == 'POST') {  
        try {
            if (!request.body.refresh_token) {
              return response.status(401).json("AXIOS_ERROR", { status: 401 });
            }
            const jwt = require("jsonwebtoken");
            const verifiedToken = jwt.verify(request.body.refresh_token, process.env.REFRESH_SECRET_KEY);
            // console.log(verifiedToken)
            const exUser = await prisma.user.findUnique({
              where: {
                email: verifiedToken.email
              },
            });

            const exAccount = await prisma.account.findUnique({
              where: {
                id: exUser.id
              },
            });

            const checkVerifiedRefreshToken = exAccount?.expires_refresh - Math.round(Date.now() / 1000)
            if (checkVerifiedRefreshToken < 0) {
              return response.status(401).json("TOKEN_EXPIRE", { status: 401 });
            }

            const access_token = jwt.sign({ email: exUser.email, name: exUser.name }, process.env.CREDENTIALS_SECRET_KEY, {
              expiresIn: "1h",
            });

            const expires_time = Math.round(Date.now() / 1000) + 1 * 60 * 60;

            const updateAccount = await prisma.account.updateMany({
              where: { userId: exUser.id, },
              data: {
                access_token: access_token,
                expires_at: expires_time,
              }
            })

            return response.status(200).json({
              'access_token': access_token,
              'expires_at': expires_time,
            }, {status: 200});
        } catch (error) {
            console.log(Error, 'REFRESH_ERROR');
            return response.status(500).json("Internal Error", { status: 500 });
        }
    }
}