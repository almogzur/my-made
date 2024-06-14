import Link from "next/link";

export default function CostumeLink ({
  href,
  children,
  text
 })
  {
    return (
      <Link 
        href={href}
        className="nav-link"
           >
        <div className="inner-link-Wrapper" >
           {text}     
           {children}
      </div>
      </Link>
    )
}


