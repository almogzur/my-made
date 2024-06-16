
export default function handler(req, res) {

  console.log(req.body)
  res.json({status:"OK"})
  }

  export const config = {
    api: {
      bodyParser: {
        sizeLimit: '10mb',
      },
      maxDuration: 5,
    },
  }