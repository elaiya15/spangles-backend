                         
                          //  Sign-In api 
                           
  {  Api router POST = "https://spangles-backend.onrender.com/register/signin"
            value= {  
                 UserName
                 Password
                }         
}           
                     //  Application API => POST,GET,PUT,

                      //  Application API => POST
{ Api router POST = "https://spangles-backend.onrender.com/applied"
          value= {  Name
                   Designation
                   Experience
                   Skills
                   Resume
                   SalaryExpectation
                   AppliedOn
                   Description
                   Email
                 }         
},
                      //  Application API => Get
{ Api router Get = "https://spangles-backend.onrender.com/applied" },


                       //  Application API => put
                      { Api router put = https://spangles-backend.onrender.com/applied"
                      value = {  Name
                               Designation
                               Experience
                               Skills
                               Resume
                               SalaryExpectation
                               AppliedOn
                               Description
                               Email
                             }         
            },

            //  Template API => Get,POST,PUT,DELETE

                      //  Template API => Get
                      { Api router Get = "https://spangles-backend.onrender.com/Templeta" },


                       //  Template API => POST
                     { Api router POST = https://spangles-backend.onrender.com/Templeta/"
                     value = { 
                       TemplateName
                       Description
                      EffectiveDate
                            }         
           },

                //  Template API => PUT
                { Api router POST = https://spangles-backend.onrender.com/Templeta/:id"
                value = { 
                  TemplateName
                  Description
                 EffectiveDate
                       }         
      },

           //  Template API => Deleted
           { Api router POST = https://spangles-backend.onrender.com/Templeta/:id"
              
 },


