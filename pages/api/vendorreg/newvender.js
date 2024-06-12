export default function handler(req, res) {
    console.log(req)
  }

  export const config = {
    api: {
      bodyParser: {
        sizeLimit: '10mb',
      },
    },
  }