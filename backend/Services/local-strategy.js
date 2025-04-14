const passport=require('passport')
const {Strategy}=require('passport-local')
const bcrypt=require('bcrypt')
const DbConfig=require("../configs/DbConfig")
const db=new DbConfig()
    passport.serializeUser((user,done)=>{
        done(null,user.USER_NAME)
    })
    passport.deserializeUser(async (ID,done)=>{
        try{
          const connection=await db.getConnection()
          const findUser=await connection.execute("Select * from login where USER_NAME=?",[ID])
          if(!findUser) new CustomError("User Not Found",404) 
          done(null,findUser)
        }catch(err){
            done(err,null)
        }
    })
    passport.use(
        new Strategy(async (username,password,done)=>{
           try{
            const connection=await db.getConnection()
           const findUser=await connection.execute("Select * from login where USER_NAME=?",[username])
           if(findUser[0].length<=0) throw new CustomError("User Not Found",404)  
           for(let i=0;i<findUser[0].length;i++){
           
            if(findUser[0][i].USER_NAME!==username) {
                throw new CustomError("User Not Found",404) 
            }else{
                 // if(bcrypt.compareSync(password,findUser[0][i])){
            //     done(null,findUser[0][0])
            // }
                if(password===findUser[0][i].PASSWORD){
                    done(null,findUser[0][0]) 
                }else{
                    throw new CustomError("UnauthorizedException",401)
                }
            }
            
        }          
           }catch(err){
            done(err,null)
           }

        })
    )
    hashPassword=(password)=>{
        const hash=bcrypt.hashSync(password,bcrypt.genSaltSync(10))  
    }

    class CustomError extends Error{
        constructor(message,statusCode){
            super(message)
            this.statusCode=statusCode
        }
    }
    
    module.exports={passport,hashPassword}