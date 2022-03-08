import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import  CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "lib/mongodb";
import { compare } from "bcryptjs";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
      }),
    
    CredentialsProvider({
      id: 'credentials',
      name: 'login',
      credentials: {
        name: {
          label: 'name',
          type: 'name',
          placeholder: 'johndoe',
        },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        //Connect to DB
        //Get all the users
        let client = await clientPromise;
        const users = client.db().collection('users');
        //Find user with the email  
        const result = await users.findOne({
          name: credentials.name,
        });
            //Not found - send error res
        if (!result) {
          client.close();
          throw new Error('No user found with the email');
        }
        const checkPassword = await compare(credentials.password, result.password);
        //Incorrect password - send response
        if (!checkPassword) {
          throw new Error(`Password doesnt match`);
        }
        //Else send success response
        client.close();
        return { name: result.name,email:result.email, credentials:result.credentials, userId:result._id };
      },
    }),
  ],
  //define if we are using database session or jwt
  // adapter: MongoDBAdapter(clientPromise),
  jwt:{
    secret: process.env.JWT_SECRET,
  },
  secret:process.env.NEXTAUTH_SECRET,
  session:{
      jwt:true,
      maxAge:24*60*60*30,
      updateAge:24*60*60*30
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.user=user;
        token.user.credentials=account.provider;
        let client = await clientPromise;
        const users = client.db().collection('users');
        if(account.provider==="github"){
          const result = await users.findOne({
            email: user.email,
            credentials:"github"
          });
          if(!result){
            let newUser = await users.insertOne({...user, credentials:"github",role:"user"});
            token.user.id=newUser.insertedId;
          }
          else{
            token.user.userId=result._id;
          }
        }

        if(account.provider==="google"){
          const result = await users.findOne({
            email: user.email,
            credentials:"google"
          });
          if(!result){
            let newUser = await users.insertOne({...user, credentials:"google",role:"user"});
            token.user.id=newUser.insertedId;
          }
          else{
            token.user.userId=result._id;
          }
        }
        client.close();
        return token;
      }
      return token;
    },

    async session({ session,token}) {
      if(token){
        session.user.credentials=token.user.credentials;
        session.user.userId=token.user.userId;
      }
      
      return session;
    },
  },
})