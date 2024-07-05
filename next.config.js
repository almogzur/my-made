/** @type {import('next').NextConfig} */
const nextConfig = {

  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  images:{
    remotePatterns: [
         {
            protocol:'https',
            hostname:'**.builder.io',
          },
          {
            protocol:'https',
            hostname:'**.googleusercontent.com',
          },
          {     
             protocol:'https',
             hostname:'**.discordapp.com',
           },
           {
             protocol:'https',
             hostname:"**.githußbusercontent.com"
           }
              ],
          }

}

module.exports = nextConfig
