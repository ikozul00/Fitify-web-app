import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "lib/mongodb"

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
  ],
  adapter: MongoDBAdapter(clientPromise),
  jwt:{
    secret: process.env.JWT_SECRET,
  },
  secret:process.env.NEXTAUTH_SECRET,
  session:{
      jwt:true,
      maxAge:2*60*60,
    //   updateAge
  }
})