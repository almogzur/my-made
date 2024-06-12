import Link from "next/link";

export default function CostumeLink ({href,children,text,index}){
    return (
      <Link 
        href={href}
        className="nav-link"
           >
        <div className="costume-link-Wrapper" >
           {text}     
           {children}
      </div>
      </Link>
    )
}
