
export default function handler(req, res) {
  if(req.method ==="POST")
    {
      console.log(req.body)
    }
  else if(req.method ==="GET"){
    
  }
    console.log("")
  }

  export const config = {
    api: {
      bodyParser: {
        sizeLimit: '10mb',
      },
    },
  }