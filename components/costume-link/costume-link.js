import Link from "next/link";

export default function CostumeLink ({
  href,
  children,
  text,
  linkStyle,
  divStyle,
 })
  {


  return (
       <Link 
          href={href}
          style={{...linkStyle}}
        >
          <div 
             style={{...divStyle}} 
           >
             {text}     
             {children}
          </div>
       </Link>

    )
}


