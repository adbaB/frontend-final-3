import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  session:{ strategy:"jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req){
        // Add logic here to look up the user from the credentials supplied
        console.log(credentials)
        const {username , password} = credentials as {
          username: string;
          password: string;
        }
        if (username === 'admin' && password === 'admin') {
          const user = {
            id: 1,
            name: "admin",
            email: "XXXXXXXXXXXXXXX",
          };
          return user;
        }
        else{
          throw new Error("Invalid username or password");
        } 
         
      },
    
    }),
  ],
  pages: {
    signIn: "app/login",
  }
});

export { handler as GET, handler as POST }